let WasmGame;
let initWasm;

class JsGame {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.x = width / 2;
    this.y = height / 2;
    this.plants = [
      { x: 50, y: 50 },
      { x: 150, y: 80 },
      { x: 80, y: 150 }
    ];
    this.collected = 0;
  }

  move_player(dx, dy) {
    this.x = Math.min(Math.max(this.x + dx, 0), this.width);
    this.y = Math.min(Math.max(this.y + dy, 0), this.height);
    this.#checkCollisions();
  }

  #checkCollisions() {
    let i = 0;
    while (i < this.plants.length) {
      const p = this.plants[i];
      const dx = this.x - p.x;
      const dy = this.y - p.y;
      if (Math.hypot(dx, dy) < 20) {
        this.plants.splice(i, 1);
        this.collected += 1;
      } else {
        i++;
      }
    }
  }

  player_x() { return this.x; }
  player_y() { return this.y; }
  plant_count() { return this.plants.length; }
  plant_x(i) { return this.plants[i].x; }
  plant_y(i) { return this.plants[i].y; }
  collected() { return this.collected; }
}

async function start() {
  const canvas = document.getElementById('game');
  const ctx = canvas.getContext('2d');
  let game;

  try {
    const wasm = await import('./wasm_game/pkg/wasm_game.js');
    initWasm = wasm.default;
    WasmGame = wasm.Game;
    await initWasm();
    game = WasmGame.new(canvas.width, canvas.height);
  } catch (e) {
    console.warn('WASM failed, falling back to JS implementation', e);
    game = new JsGame(canvas.width, canvas.height);
  }

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
