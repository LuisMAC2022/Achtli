import { jsUpdatePlants, jsCollectAt, jsFindPlantAt, createInitialPlants } from './game-logic.js';
import { setupUI } from './ui.js';

const VERSION = '0.0.0.0';

/**
 * Punto de entrada principal del juego. Inicializa canvas y lógica.
 */
async function start() {
  const canvas = document.getElementById('game');
  const ctx = canvas.getContext('2d');
  const overlay = document.getElementById('plant-overlay');

  const plantInfo = [
    { name: 'Planta rápida', requirements: 'Riego frecuente', desc: 'Crecimiento veloz' },
    { name: 'Planta media', requirements: 'Sol y agua moderados', desc: 'Crecimiento regular' },
    { name: 'Planta lenta', requirements: 'Poca agua', desc: 'Crecimiento lento y resistente' }
  ];

  /** Ajusta el tamaño del canvas a la ventana. */
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener('resize', resize);

  let wasmModule = null;
  let game = null;
  let jsPlants = null;
  let jsCollected = 0;

  try {
    const wasm = await import('../wasm_game/pkg/wasm_game.js');
    await wasm.default();
    wasm.draw_pink();
    wasmModule = wasm;
    game = new wasm.Game(canvas.width, canvas.height);
  } catch (e) {
    console.warn('WASM failed, drawing pink with JS', e);
    jsPlants = createInitialPlants();
  }

  const playerSize = 20;
  const player = { x: canvas.width / 2 - playerSize / 2, y: canvas.height / 2 - playerSize / 2 };
  const counter = document.getElementById('counter');
  let lastCollected = 0;
  let lastTime = performance.now();

  /** Verifica si el jugador recolecta una planta. */
  function jsCheckCollisions() {
    if (jsCollectAt(jsPlants, player.x + playerSize / 2, player.y + playerSize / 2)) {
      jsCollected++;
    }
  }

  /** Mueve al jugador y aplica colisiones según el modo. */
  function movePlayer(dx, dy) {
    if (game) {
      game.move_player(dx, dy);
    } else {
      player.x = Math.max(0, Math.min(canvas.width - playerSize, player.x + dx));
      player.y = Math.max(0, Math.min(canvas.height - playerSize, player.y + dy));
      jsCheckCollisions();
    }
  }

  /** Busca el índice de la planta en las coordenadas dadas. */
  function findPlantIndex(x, y) {
    return game ? game.plant_index_at(x, y) : jsFindPlantAt(jsPlants, x, y);
  }

  /** Devuelve la etapa de crecimiento de la planta. */
  function getPlantStage(index) {
    return game ? game.plant_stage(index) : (jsPlants ? jsPlants[index].stage : 0);
  }

  /** Obtiene la especie de la planta. */
  function getPlantSpecies(index) {
    return game ? game.plant_species(index) : (jsPlants ? jsPlants[index].species : '');
  }

  setupUI(canvas, overlay, plantInfo, { movePlayer, findPlantIndex, getPlantStage, getPlantSpecies });

  /** Bucle principal de dibujo y actualización. */
  function draw() {
    const now = performance.now();
    const dt = (now - lastTime) / 1000;
    lastTime = now;
    if (game) {
      game.update(dt);
    } else {
      jsUpdatePlants(jsPlants, dt);
    }

    if (wasmModule) {
      wasmModule.draw_pink();
    } else {
      ctx.fillStyle = 'pink';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    if (game) {
      const positions = game.plant_positions();
      for (let i = 0; i < positions.length; i++) {
        const [x, y, stage, color] = positions[i];
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, 5 + stage, 0, Math.PI * 2);
        ctx.fill();
      }
      const collected = game.collected();
      if (collected !== lastCollected) {
        counter.textContent = collected;
        lastCollected = collected;
      }
      ctx.fillStyle = 'blue';
      ctx.fillRect(game.player_x(), game.player_y(), playerSize, playerSize);
    } else {
      if (jsPlants) {
        for (let i = 0; i < jsPlants.length; i++) {
          const p = jsPlants[i];
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 5 + p.stage, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      if (jsCollected !== lastCollected) {
        counter.textContent = jsCollected;
        lastCollected = jsCollected;
      }
      ctx.fillStyle = 'blue';
      ctx.fillRect(player.x, player.y, playerSize, playerSize);
    }

    ctx.font = '16px sans-serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'top';
    ctx.fillStyle = 'white';
    ctx.fillText(`version ${VERSION}`, canvas.width - 10, 10);

    requestAnimationFrame(draw);
  }

  draw();
}

start();
