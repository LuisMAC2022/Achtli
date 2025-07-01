// Etapa en la que una planta se considera madura
export const MATURE_STAGE = 5;

/**
 * Devuelve un elemento aleatorio del arreglo recibido.
 */
function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Genera un color para la semilla de forma aleatoria.
 */
export function seedColor() {
  return randomChoice(['brown', 'black']);
}

/**
 * Color aleatorio que toma la planta al madurar.
 */
export function matureColor() {
  return randomChoice(['red', 'white', 'blue', 'yellow']);
}

/**
 * Intervalo (en segundos) que tarda en crecer cada tipo de planta.
 */
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

/**
 * Avanza el crecimiento de todas las plantas según el tiempo transcurrido.
 */
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

/**
 * Intenta recolectar la planta madura más cercana a las coordenadas.
 * Devuelve true si alguna fue eliminada del arreglo.
 */
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

/**
 * Devuelve el índice de la planta más cercana a las coordenadas.
 */
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

/**
 * Genera el arreglo inicial de plantas para la versión en JavaScript.
 */
export function createInitialPlants() {
  return [
    { x: 50, y: 50, species: 'fast', stage: 0, timer: 0, color: seedColor() },
    { x: 150, y: 80, species: 'medium', stage: 0, timer: 0, color: seedColor() },
    { x: 80, y: 150, species: 'slow', stage: 0, timer: 0, color: seedColor() }
  ];
}
