import { setupUI } from './ui.js';

const VERSION = '0.1.0';

// Definiciones de plantas e insectos
const plantInfo = [
  {
    name: 'Cempasúchil',
    requirements: 'Riego constante',
    desc: 'Produce pétalos',
    growthRate: 1,
    yield: 'petalos',
    color: 'orange'
  },
  {
    name: 'Maguey',
    requirements: 'Sol intenso',
    desc: 'Produce frutos',
    growthRate: 0.6,
    yield: 'frutos',
    color: 'green'
  },
  {
    name: 'Maíz',
    requirements: 'Suelo fértil',
    desc: 'Produce semillas',
    growthRate: 0.4,
    yield: 'semillas',
    color: 'yellow'
  }
];

const insectDefs = {
  petalos: { type: 'Abeja', bonus: 1, color: 'gold' },
  frutos: { type: 'Mariposa', bonus: 2, color: 'violet' },
  semillas: { type: 'Chapulín', bonus: 3, color: 'lime' }
};

class Plant {
  constructor(info, x, y) {
    this.info = info;
    this.x = x;
    this.y = y;
    this.progress = 0; // 0 a 3
    this.hasYield = false;
  }
  update(dt) {
    if (this.hasYield) return;
    this.progress += this.info.growthRate * dt;
    if (this.progress >= 3) {
      this.progress = 3;
      this.hasYield = true;
    }
  }
  stage() {
    return Math.floor(this.progress);
  }
  harvest() {
    if (!this.hasYield) return null;
    this.hasYield = false;
    this.progress = 0;
    return this.info.yield;
  }
}

class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.player = { x: width / 2, y: height / 2, size: 20 };
    this.plants = [
      new Plant(plantInfo[0], width * 0.3, height * 0.3),
      new Plant(plantInfo[1], width * 0.6, height * 0.5),
      new Plant(plantInfo[2], width * 0.8, height * 0.7)
    ];
    this.insects = [];
    this.collectedCount = 0;
  }
  move_player(dx, dy) {
    this.player.x = Math.max(0, Math.min(this.width - this.player.size, this.player.x + dx));
    this.player.y = Math.max(0, Math.min(this.height - this.player.size, this.player.y + dy));
  }
  player_x() { return this.player.x; }
  player_y() { return this.player.y; }
  update(dt) {
    this.plants.forEach(p => p.update(dt));
    this.spawnInsects();
    this.updateInsects(dt);
    this.checkPlayerHarvest();
  }
  checkPlayerHarvest() {
    this.plants.forEach(p => {
      if (p.hasYield && this._dist(this.player.x, this.player.y, p.x, p.y) < 25) {
        p.harvest();
        this.collectedCount++;
      }
    });
  }
  spawnInsects() {
    this.plants.forEach(p => {
      if (p.hasYield && !this.insects.some(i => i.target === p)) {
        const def = insectDefs[p.info.yield];
        this.insects.push({ def, target: p, timer: 1 });
      }
    });
  }
  updateInsects(dt) {
    this.insects = this.insects.filter(i => {
      i.timer -= dt;
      if (i.timer <= 0) {
        i.target.harvest();
        this.collectedCount += i.def.bonus;
        return false;
      }
      return true;
    });
  }
  plant_index_at(x, y) {
    return this.plants.findIndex(p => this._dist(p.x, p.y, x, y) < 20);
  }
  plant_stage(index) {
    return this.plants[index]?.stage() ?? 0;
  }
  plant_species(index) {
    return this.plants[index]?.info.name ?? '';
  }
  plant_positions() {
    return this.plants.map(p => [p.x, p.y, p.stage(), p.info.color]);
  }
  insect_positions() {
    return this.insects.map(i => [i.target.x, i.target.y, i.def.color]);
  }
  collected() {
    return this.collectedCount;
  }
  _dist(x1, y1, x2, y2) {
    const dx = x1 - x2;
    const dy = y1 - y2;
    return Math.hypot(dx, dy);
  }
}

function start() {
  const canvas = document.getElementById('game');
  const ctx = canvas.getContext('2d');
  const overlay = document.getElementById('plant-overlay');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const game = new Game(canvas.width, canvas.height);
  setupUI(canvas, overlay, plantInfo, {
    movePlayer: (dx, dy) => game.move_player(dx, dy),
    findPlantIndex: (x, y) => game.plant_index_at(x, y),
    getPlantStage: (i) => game.plant_stage(i),
    getPlantSpecies: (i) => game.plant_species(i)
  });

  let lastTime = performance.now();
  const counter = document.getElementById('counter');

  function draw() {
    const now = performance.now();
    const dt = (now - lastTime) / 1000;
    lastTime = now;
    game.update(dt);

    ctx.fillStyle = '#333';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    game.plant_positions().forEach(([x, y, stage, color]) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, 5 + stage * 3, 0, Math.PI * 2);
      ctx.fill();
    });

    game.insect_positions().forEach(([x, y, color]) => {
      ctx.fillStyle = color;
      ctx.fillRect(x - 5, y - 5, 10, 10);
    });

    ctx.fillStyle = 'blue';
    ctx.fillRect(game.player_x(), game.player_y(), game.player.size, game.player.size);

    counter.textContent = game.collected();

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
