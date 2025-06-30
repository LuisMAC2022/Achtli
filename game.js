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
