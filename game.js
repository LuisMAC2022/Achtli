
const VERSION = '0.0.0.5';


/** Devuelve un elemento aleatorio de un arreglo. */
function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** Color inicial de cada semilla. */
function seedColor() {
  return randomChoice(['brown', 'black']);
}

/** Color aleatorio al madurar la planta. */
function matureColor() {
  return randomChoice(['red', 'white', 'blue', 'yellow']);
}

const MATURE_STAGE = 5;

/**
 * Configura el juego y arranca el ciclo de animación.
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

  /** Ajusta el canvas al tamaño de la ventana. */
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

  /** Intervalo en segundos para el crecimiento según la especie. */
  function jsGrowthInterval(species) {
    switch (species) {
      case 'fast':
        return 1;
      case 'slow':
        return 3600;
      default:
        return 60;
    }
  }

  /** Controla el avance de todas las plantas en modo JS. */
  function jsUpdatePlants(dt) {
    if (!jsPlants) return;
    for (const plant of jsPlants) {
      if (plant.stage >= MATURE_STAGE) continue;
      plant.timer += dt;
      const interval = jsGrowthInterval(plant.species);
      while (plant.stage < MATURE_STAGE && plant.timer >= interval) {
        plant.timer -= interval;
        plant.stage += 1;
        if (plant.stage === 1) {
          plant.color = 'green';
        } else if (plant.stage === MATURE_STAGE) {
          plant.color = matureColor();
        }
      }
    }
  }

  try {
    const wasm = await import('./wasm_game/pkg/wasm_game.js');
    await wasm.default();
    wasm.draw_pink();
    wasmModule = wasm;
    game = new wasm.Game(canvas.width, canvas.height);
  } catch (e) {
    console.warn('WASM failed, drawing pink with JS', e);
    jsPlants = [
      { x: 50, y: 50, species: 'fast', stage: 0, timer: 0, color: seedColor() },
      { x: 150, y: 80, species: 'medium', stage: 0, timer: 0, color: seedColor() },
      { x: 80, y: 150, species: 'slow', stage: 0, timer: 0, color: seedColor() }
    ];
  }

  const playerSize = 20;
  const player = { x: canvas.width / 2 - playerSize / 2, y: canvas.height / 2 - playerSize / 2 };
  const speed = 5;
  const counter = document.getElementById('counter');
  let lastCollected = 0;
  let lastTime = performance.now();

  /** Recolecta una planta madura en las coordenadas indicadas. */
  function jsCollectAt(x, y) {
    if (!jsPlants) return false;
    let i = 0;
    let hit = false;
    while (i < jsPlants.length) {
      const p = jsPlants[i];
      const dx = x - p.x;
      const dy = y - p.y;
      if (Math.sqrt(dx * dx + dy * dy) < 20 && p.stage >= MATURE_STAGE) {
        jsPlants.splice(i, 1);
        jsCollected++;
        hit = true;
      } else {
        i++;
      }
    }
    return hit;
  }

  /** Devuelve el índice de la planta cercana a las coordenadas. */
  function jsFindPlantAt(x, y) {
    if (!jsPlants) return -1;
    for (let i = 0; i < jsPlants.length; i++) {
      const p = jsPlants[i];
      const dx = x - p.x;
      const dy = y - p.y;
      if (Math.sqrt(dx * dx + dy * dy) < 20) {
        return i;
      }
    }
    return -1;
  }

  /** Comprueba si el jugador toca una planta madura. */
  function jsCheckCollisions() {
    jsCollectAt(player.x + playerSize / 2, player.y + playerSize / 2);
  }

  canvas.focus();
  canvas.addEventListener('keydown', (e) => {
    let dx = 0;
    let dy = 0;
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        dy = -speed;
        break;
      case 'ArrowDown':
        e.preventDefault();
        dy = speed;
        break;
      case 'ArrowLeft':
        e.preventDefault();
        dx = -speed;
        break;
      case 'ArrowRight':
        e.preventDefault();
        dx = speed;
        break;
      default:
        return;
    }
    if (game) {
      game.move_player(dx, dy);
    } else {
      player.x = Math.max(0, Math.min(canvas.width - playerSize, player.x + dx));
      player.y = Math.max(0, Math.min(canvas.height - playerSize, player.y + dy));
      jsCheckCollisions();
    }
  });

  let dragging = false;
  let lastX = 0;
  let lastY = 0;

  /** Inicia el movimiento por arrastre. */
  function startDrag(x, y) {
    dragging = true;
    lastX = x;
    lastY = y;
  }

  /** Mueve al jugador según el desplazamiento del puntero. */
  function moveDrag(x, y) {
    if (!dragging) return;
    const dx = x - lastX;
    const dy = y - lastY;
    lastX = x;
    lastY = y;
    if (game) {
      game.move_player(dx, dy);
    } else {
      player.x = Math.max(0, Math.min(canvas.width - playerSize, player.x + dx));
      player.y = Math.max(0, Math.min(canvas.height - playerSize, player.y + dy));
      jsCheckCollisions();
    }
  }

  /** Termina el arrastre actual. */
  function endDrag() {
    dragging = false;
  }

  /** Muestra detalles de la planta seleccionada. */
  function showOverlay(index) {
    const species = game ? game.plant_species(index) : (jsPlants ? jsPlants[index].species : '');
    const stage = game ? game.plant_stage(index) : (jsPlants ? jsPlants[index].stage : 0);
    const info = plantInfo[index] || {};
    overlay.innerHTML = `<h2>${info.name || species}</h2>` +
      `<p>Fase actual: ${stage}</p>` +
      `<p>Requisitos: ${info.requirements || ''}</p>` +
      `<p>${info.desc || ''}</p>`;
    overlay.style.display = 'block';
  }

  /** Oculta el panel de información. */
  function hideOverlay() {
    overlay.style.display = 'none';
  }

  if (window.PointerEvent) {
    canvas.addEventListener('pointerdown', (e) => {
      const idx = game ? game.plant_index_at(e.clientX, e.clientY) : jsFindPlantAt(e.clientX, e.clientY);
      if (idx >= 0) {
        e.stopPropagation();
        showOverlay(idx);
      } else {
        startDrag(e.clientX, e.clientY);
        canvas.setPointerCapture(e.pointerId);
      }
    });
    canvas.addEventListener('pointermove', (e) => moveDrag(e.clientX, e.clientY));
    canvas.addEventListener('pointerup', endDrag);
    canvas.addEventListener('pointercancel', endDrag);
  } else {
    canvas.addEventListener('touchstart', (e) => {
      const t = e.touches[0];
      const idx = game ? game.plant_index_at(t.clientX, t.clientY) : jsFindPlantAt(t.clientX, t.clientY);
      if (idx >= 0) {
        e.stopPropagation();
        showOverlay(idx);
      } else {
        startDrag(t.clientX, t.clientY);
      }
    }, { passive: false });
    canvas.addEventListener('touchmove', (e) => {
      const t = e.touches[0];
      moveDrag(t.clientX, t.clientY);
    }, { passive: false });
    canvas.addEventListener('touchend', endDrag);
    canvas.addEventListener('touchcancel', endDrag);
  }

  document.addEventListener('pointerdown', (e) => {
    if (overlay.style.display === 'block' && !overlay.contains(e.target)) {
      hideOverlay();
    }
  });

  /** Dibuja la escena completa y programa el siguiente cuadro. */
  function draw() {
    const now = performance.now();
    const dt = (now - lastTime) / 1000;
    lastTime = now;
    if (game) {
      game.update(dt);
    } else {
      jsUpdatePlants(dt);
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

    // Draw version text on the top-right corner
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
