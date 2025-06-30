import init, { Game } from './wasm_game/pkg/wasm_game.js';

async function start() {
  await init();
  const canvas = document.getElementById('game');
  const ctx = canvas.getContext('2d');
  const game = Game.new(canvas.width, canvas.height);

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'blue';
    ctx.fillRect(game.player_x() - 10, game.player_y() - 10, 20, 20);

    ctx.fillStyle = 'green';
    for (let i = 0; i < game.plant_count(); i++) {
      const x = game.plant_x(i);
      const y = game.plant_y(i);
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, Math.PI * 2);
      ctx.fill();
    }

    document.getElementById('counter').textContent = game.collected();
    requestAnimationFrame(draw);
  }

  document.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'ArrowUp':
        game.move_player(0, -5);
        break;
      case 'ArrowDown':
        game.move_player(0, 5);
        break;
      case 'ArrowLeft':
        game.move_player(-5, 0);
        break;
      case 'ArrowRight':
        game.move_player(5, 0);
        break;
    }
  });

  draw();
}

start();
