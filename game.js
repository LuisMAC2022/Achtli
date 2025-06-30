async function start() {
  const canvas = document.getElementById('game');
  const ctx = canvas.getContext('2d');

  try {
    const wasm = await import('./wasm_game/pkg/wasm_game.js');
    await wasm.default();
    wasm.draw_pink();
  } catch (e) {
    console.warn('WASM failed, drawing pink with JS', e);
    ctx.fillStyle = 'pink';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

start();
