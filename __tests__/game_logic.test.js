let jsCollectAt;
let MATURE_STAGE;

beforeAll(async () => {
  const mod = await import('../js/game-logic.js');
  jsCollectAt = mod.jsCollectAt;
  MATURE_STAGE = mod.MATURE_STAGE;
});

test('collects a mature plant when coordinates match', () => {
  const plants = [{ x: 10, y: 10, stage: MATURE_STAGE }];
  const hit = jsCollectAt(plants, 10, 10);
  expect(hit).toBe(true);
  expect(plants.length).toBe(0);
});

test('returns false when no plant is nearby', () => {
  const plants = [{ x: 10, y: 10, stage: MATURE_STAGE }];
  const hit = jsCollectAt(plants, 100, 100);
  expect(hit).toBe(false);
  expect(plants.length).toBe(1);
});

test('does not collect if plant is not mature', () => {
  const plants = [{ x: 10, y: 10, stage: 2 }];
  const hit = jsCollectAt(plants, 10, 10);
  expect(hit).toBe(false);
  expect(plants.length).toBe(1);
});
