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
  try {
    const wasm = await import('./wasm_game/pkg/wasm_game.js');
    await wasm.default();
    wasm.draw_pink();
    wasmModule = wasm;
  } catch (e) {
    console.warn('WASM failed, drawing pink with JS', e);
  }

  const player = { x: canvas.width / 2 - 10, y: canvas.height / 2 - 10, size: 20 };
  const speed = 5;

  canvas.focus();
  canvas.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        player.y = Math.max(0, player.y - speed);
        break;
      case 'ArrowDown':
        e.preventDefault();
        player.y = Math.min(canvas.height - player.size, player.y + speed);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        player.x = Math.max(0, player.x - speed);
        break;
      case 'ArrowRight':
        e.preventDefault();
        player.x = Math.min(canvas.width - player.size, player.x + speed);
        break;
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
    player.x = Math.max(0, Math.min(canvas.width - player.size, player.x + dx));
    player.y = Math.max(0, Math.min(canvas.height - player.size, player.y + dy));
  }

  function endDrag() {
    dragging = false;
  }

  if (window.PointerEvent) {
    canvas.addEventListener('pointerdown', (e) => {
      startDrag(e.clientX, e.clientY);
      canvas.setPointerCapture(e.pointerId);
    });
    canvas.addEventListener('pointermove', (e) => moveDrag(e.clientX, e.clientY));
    canvas.addEventListener('pointerup', endDrag);
    canvas.addEventListener('pointercancel', endDrag);
  } else {
    canvas.addEventListener('touchstart', (e) => {
      const t = e.touches[0];
      startDrag(t.clientX, t.clientY);
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

    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x, player.y, player.size, player.size);

    requestAnimationFrame(draw);
  }

  draw();
}

start();
