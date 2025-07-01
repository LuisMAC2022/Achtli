function jsCollectAt(plants, x, y) {
  let i = 0;
  let hit = false;
  while (i < plants.length) {
    const p = plants[i];
    const dx = x - p.x;
    const dy = y - p.y;
    if (p.mature && Math.sqrt(dx * dx + dy * dy) < 20) {
      plants.splice(i, 1);
      hit = true;
    } else {
      i++;
    }
  }
  return hit;
}

module.exports = { jsCollectAt };
