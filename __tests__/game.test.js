import { jsCollectAt } from '../game.js';

describe('jsCollectAt', () => {
  test('collects plant when within range', () => {
    const plants = [ { x: 10, y: 10 } ];
    const hit = jsCollectAt(plants, 10, 10);
    expect(hit).toBe(true);
    expect(plants.length).toBe(0);
  });

  test('returns false when no plant nearby', () => {
    const plants = [ { x: 10, y: 10 } ];
    const hit = jsCollectAt(plants, 50, 50);
    expect(hit).toBe(false);
    expect(plants.length).toBe(1);
  });
});
