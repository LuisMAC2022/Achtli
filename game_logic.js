function jsCollectAt(plants, x, y) {
  let i = 0;
  let hit = false;
  while (i < plants.length) {
    const p = plants[i];
    const dx = x - p.x;
    const dy = y - p.y;
    if (Math.sqrt(dx * dx + dy * dy) < 20) {
      plants.splice(i, 1);
      hit = true;
    } else {
      i++;
    }
  }
  return hit;
}

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

module.exports = { jsCollectAt, jsFindPlantAt };
