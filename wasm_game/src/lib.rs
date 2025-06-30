use wasm_bindgen::prelude::*;
use wasm_bindgen::JsValue;
use js_sys::Array;

#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub struct Game {
    width: f64,
    height: f64,
    player_x: f64,
    player_y: f64,
    plants: Vec<(f64, f64)>,
    collected: u32,
}

#[wasm_bindgen]
impl Game {
    #[wasm_bindgen(constructor)]
    pub fn new(width: f64, height: f64) -> Game {
        let plants = vec![
            (50.0, 50.0),
            (150.0, 80.0),
            (80.0, 150.0),
        ];
        Game {
            width,
            height,
            player_x: width / 2.0,
            player_y: height / 2.0,
            plants,
            collected: 0,
        }
    }

    pub fn move_player(&mut self, dx: f64, dy: f64) {
        self.player_x = (self.player_x + dx).clamp(0.0, self.width);
        self.player_y = (self.player_y + dy).clamp(0.0, self.height);
        self.check_collisions();
    }

    fn check_collisions(&mut self) {
        let mut i = 0;
        while i < self.plants.len() {
            let (px, py) = self.plants[i];
            let dx = self.player_x - px;
            let dy = self.player_y - py;
            if (dx * dx + dy * dy).sqrt() < 20.0 {
                self.plants.remove(i);
                self.collected += 1;
            } else {
                i += 1;
            }
        }
    }

    pub fn player_x(&self) -> f64 { self.player_x }
    pub fn player_y(&self) -> f64 { self.player_y }
    pub fn plant_count(&self) -> usize { self.plants.len() }
    pub fn plant_x(&self, idx: usize) -> f64 { self.plants[idx].0 }
    pub fn plant_y(&self, idx: usize) -> f64 { self.plants[idx].1 }
    pub fn collected(&self) -> u32 { self.collected }

    pub fn plant_positions(&self) -> Array {
        let arr = Array::new();
        for (x, y) in &self.plants {
            let pair = Array::new();
            pair.push(&JsValue::from_f64(*x));
            pair.push(&JsValue::from_f64(*y));
            arr.push(&pair);
        }
        arr
    }
}
