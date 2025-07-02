import { setupUI } from './ui.js';

const VERSION = '0.0.0.1';

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

  const wasm = await import('../wasm_game/pkg/wasm_game.js');
  await wasm.default();
  wasm.draw_pink();
  wasmModule = wasm;
  game = new wasm.Game(canvas.width, canvas.height);

  const playerSize = 20;
  const counter = document.getElementById('counter');
  let lastCollected = 0;
  let lastTime = performance.now();

  /** Mueve al jugador dentro del canvas. */
  function movePlayer(dx, dy) {
    game.move_player(dx, dy);
  }

  /** Busca el índice de la planta en las coordenadas dadas. */
  function findPlantIndex(x, y) {
    return game.plant_index_at(x, y);
  }

  /** Devuelve la etapa de crecimiento de la planta. */
  function getPlantStage(index) {
    return game.plant_stage(index);
  }

  /** Obtiene la especie de la planta. */
  function getPlantSpecies(index) {
    return game.plant_species(index);
  }

  setupUI(canvas, overlay, plantInfo, { movePlayer, findPlantIndex, getPlantStage, getPlantSpecies });

  /** Bucle principal de dibujo y actualización. */
  function draw() {
    const now = performance.now();
    const dt = (now - lastTime) / 1000;
    lastTime = now;
    game.update(dt);

    wasmModule.draw_pink();

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
