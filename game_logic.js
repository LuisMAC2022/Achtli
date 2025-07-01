// Fase a partir de la cual se puede recolectar una planta
const MATURE_STAGE = 5;

/**
 * Recolecta una planta madura si está dentro del radio de búsqueda.
 */
function jsCollectAt(plants, x, y) {
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
 * Busca el índice de una planta cercana a las coordenadas.
 */
function jsFindPlantAt(plants, x, y) {
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

module.exports = { jsCollectAt, jsFindPlantAt, MATURE_STAGE };
