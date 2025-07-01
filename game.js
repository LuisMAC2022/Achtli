const VERSION = '0.0.0.0';

async function start() {
  const canvas = document.getElementById('game');
  const ctx = canvas.getContext('2d');

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
    const wasm = await import('./wasm_game/pkg/wasm_game.js');
    await wasm.default();
    wasm.draw_pink();
    wasmModule = wasm;
    game = new wasm.Game(canvas.width, canvas.height);
  } catch (e) {
    console.warn('WASM failed, drawing pink with JS', e);
    jsPlants = [
      { x: 50, y: 50, mature: true },
      { x: 150, y: 80, mature: false },
      { x: 80, y: 150, mature: true }
    ];
  }

  const playerSize = 20;
  const player = { x: canvas.width / 2 - playerSize / 2, y: canvas.height / 2 - playerSize / 2 };
  const speed = 5;
  const counter = document.getElementById('counter');
  let lastCollected = 0;

  function jsCollectAt(x, y) {
    if (!jsPlants) return false;
    let i = 0;
    let hit = false;
    while (i < jsPlants.length) {
      const p = jsPlants[i];
      const dx = x - p.x;
      const dy = y - p.y;
      if (p.mature && Math.sqrt(dx * dx + dy * dy) < 20) {
        jsPlants.splice(i, 1);
        jsCollected++;
        hit = true;
      } else {
        i++;
      }
    }
    return hit;
  }

  function jsCheckCollisions() {
    if (!jsPlants) return;
    let i = 0;
    const cx = player.x + playerSize / 2;
    const cy = player.y + playerSize / 2;
    while (i < jsPlants.length) {
      const p = jsPlants[i];
      const dx = cx - p.x;
      const dy = cy - p.y;
      if (p.mature && Math.sqrt(dx * dx + dy * dy) < 20) {
        jsPlants.splice(i, 1);
        jsCollected++;
      } else {
        i++;
      }
    }
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

  function startDrag(x, y) {
    dragging = true;
    lastX = x;
    lastY = y;
  }

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

  function endDrag() {
    dragging = false;
  }

  if (window.PointerEvent) {
    canvas.addEventListener('pointerdown', (e) => {
      const hit = game ? game.collect_at(e.clientX, e.clientY) : jsCollectAt(e.clientX, e.clientY);
      if (!hit) {
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
      const hit = game ? game.collect_at(t.clientX, t.clientY) : jsCollectAt(t.clientX, t.clientY);
      if (!hit) {
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

  function draw() {
    if (wasmModule) {
      wasmModule.draw_pink();
    } else {
      ctx.fillStyle = 'pink';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    if (game) {
      const positions = game.plant_positions();
      for (let i = 0; i < positions.length; i++) {
        const [x, y, mature] = positions[i];
        ctx.fillStyle = mature ? 'green' : 'lightgreen';
        ctx.beginPath();
        ctx.arc(x, y, mature ? 12 : 10, 0, Math.PI * 2);
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
          ctx.fillStyle = p.mature ? 'green' : 'lightgreen';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.mature ? 12 : 10, 0, Math.PI * 2);
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
