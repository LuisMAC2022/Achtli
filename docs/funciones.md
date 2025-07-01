# Referencia de funciones

Esta página describe brevemente las funciones disponibles en el proyecto.

## JavaScript

### js/game-logic.js
<details><summary>`seedColor()`</summary>

```javascript
export function seedColor() {
  return randomChoice(['brown', 'black']);
}
```

</details>

<details><summary>`matureColor()`</summary>

```javascript
export function matureColor() {
  return randomChoice(['red', 'white', 'blue', 'yellow']);
}
```

</details>

<details><summary>`jsGrowthInterval(species)`</summary>

```javascript
export function jsGrowthInterval(species) {
  switch (species) {
    case 'fast':
      return 1;
    case 'slow':
      return 3600;
    default:
      return 60;
  }
}
```

</details>

<details><summary>`jsUpdatePlants(plants, dt)`</summary>

```javascript
export function jsUpdatePlants(plants, dt) {
  if (!plants) return;
  for (const plant of plants) {
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
```

</details>

<details><summary>`jsCollectAt(plants, x, y)`</summary>

```javascript
export function jsCollectAt(plants, x, y) {
  let i = 0;
  let hit = false;
  while (i < plants.length) {
    const p = plants[i];
    const dx = x - p.x;
    const dy = y - p.y;
    if (Math.sqrt(dx * dx + dy * dy) < 20 && p.stage >= MATURE_STAGE) {
      plants.splice(i, 1);
      hit = true;
    } else {
      i++;
    }
  }
  return hit;
}
```

</details>

<details><summary>`jsFindPlantAt(plants, x, y)`</summary>

```javascript
export function jsFindPlantAt(plants, x, y) {
  for (let i = 0; i < plants.length; i++) {
    const p = plants[i];
    const dx = x - p.x;
    const dy = y - p.y;
    if (Math.sqrt(dx * dx + dy * dy) < 20) {
      return i;
    }
  }
  return -1;
}
```

</details>

<details><summary>`createInitialPlants()`</summary>

```javascript
export function createInitialPlants() {
  return [
    { x: 50, y: 50, species: 'fast', stage: 0, timer: 0, color: seedColor() },
    { x: 150, y: 80, species: 'medium', stage: 0, timer: 0, color: seedColor() },
    { x: 80, y: 150, species: 'slow', stage: 0, timer: 0, color: seedColor() }
  ];
}
```

</details>

### js/ui.js
<details><summary>`setupUI(canvas, overlay, plantInfo, actions)`</summary>

```javascript
export function setupUI(canvas, overlay, plantInfo, actions) {
  const { movePlayer, findPlantIndex, getPlantStage, getPlantSpecies } = actions;
  const speed = 5;
  // ...manejo de controles y overlay
}
```

</details>

### js/main.js
<details><summary>`start()`</summary>

```javascript
async function start() {
  const canvas = document.getElementById('game');
  // ...inicialización y bucle principal
}
```

</details>

<details><summary>`movePlayer(dx, dy)`</summary>

```javascript
function movePlayer(dx, dy) {
  if (game) {
    game.move_player(dx, dy);
  } else {
    player.x = Math.max(0, Math.min(canvas.width - playerSize, player.x + dx));
    player.y = Math.max(0, Math.min(canvas.height - playerSize, player.y + dy));
    jsCheckCollisions();
  }
}
```

</details>

<details><summary>`draw()`</summary>

```javascript
function draw() {
  const now = performance.now();
  const dt = (now - lastTime) / 1000;
  lastTime = now;
  // ...actualización y renderizado
  requestAnimationFrame(draw);
}
```

</details>

## Rust (wasm_game)
<details><summary>`draw_pink()`</summary>

```rust
#[wasm_bindgen]
pub fn draw_pink() -> Result<(), JsValue> {
    // ...dibuja fondo rosa
}
```

</details>

<details><summary>`Game`</summary>

```rust
#[wasm_bindgen]
pub struct Game {
    width: f64,
    height: f64,
    player_x: f64,
    player_y: f64,
    plants: Vec<Plant>,
    collected: u32,
}
```

</details>

<details><summary>`growth.rs`</summary>

```rust
pub const MATURE_STAGE: u32 = 5;
pub fn interval_for_species(species: &str) -> f64 { /* ... */ }
pub fn update_plant(plant: &mut Plant, dt: f64) { /* ... */ }
```

</details>
