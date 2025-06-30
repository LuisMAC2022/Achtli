const { jsCollectAt } = require('../game_logic');

test('collects a plant when coordinates match', () => {
  const plants = [{ x: 10, y: 10 }];
  const hit = jsCollectAt(plants, 10, 10);
  expect(hit).toBe(true);
  expect(plants.length).toBe(0);
});

test('returns false when no plant is nearby', () => {
  const plants = [{ x: 10, y: 10 }];
  const hit = jsCollectAt(plants, 100, 100);
  expect(hit).toBe(false);
  expect(plants.length).toBe(1);
});
