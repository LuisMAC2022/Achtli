use wasm_bindgen::prelude::*;
use wasm_bindgen::JsValue;
use js_sys::Array;
use wasm_bindgen::JsCast;
use web_sys::{CanvasRenderingContext2d, HtmlCanvasElement, window};

#[wasm_bindgen]
pub fn draw_pink() -> Result<(), JsValue> {
    let document = window().unwrap().document().unwrap();
    let canvas = document.get_element_by_id("game").unwrap();
    let canvas: HtmlCanvasElement = canvas.dyn_into()?;
    let ctx = canvas
        .get_context("2d")?
        .unwrap()
        .dyn_into::<CanvasRenderingContext2d>()?;
    #[allow(deprecated)]
    ctx.set_fill_style(&JsValue::from_str("pink"));
    let width = canvas.width() as f64;
    let height = canvas.height() as f64;
    ctx.fill_rect(0.0, 0.0, width, height);
    Ok(())
}

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

    pub fn collect_at(&mut self, x: f64, y: f64) -> bool {
        let mut i = 0;
        let mut collected = false;
        while i < self.plants.len() {
            let (px, py) = self.plants[i];
            let dx = x - px;
            let dy = y - py;
            if (dx * dx + dy * dy).sqrt() < 20.0 {
                self.plants.remove(i);
                self.collected += 1;
                collected = true;
            } else {
                i += 1;
            }
        }
        collected
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

// --- Tests ---
#[cfg(test)]
mod tests {
    use super::*;
    use wasm_bindgen_test::*;


    #[wasm_bindgen_test]
    fn test_move_player_bounds_and_collision() {
        let mut game = Game::new(100.0, 100.0);

        // move player outside bounds - should clamp
        game.move_player(-200.0, -200.0);
        assert_eq!(game.player_x(), 0.0);
        assert_eq!(game.player_y(), 0.0);

        // move to near first plant and ensure collision collects it
        let px = game.plant_x(0);
        let py = game.plant_y(0);
        game.move_player(px - game.player_x(), py - game.player_y());
        assert_eq!(game.collected(), 1);
        assert_eq!(game.plant_count(), 2);
    }

    #[wasm_bindgen_test]
    fn test_collect_at() {
        let mut game = Game::new(100.0, 100.0);

        let px = game.plant_x(0);
        let py = game.plant_y(0);

        assert!(game.collect_at(px, py));
        assert_eq!(game.collected(), 1);
        assert_eq!(game.plant_count(), 2);

        // clicking empty space returns false
        assert!(!game.collect_at(99.0, 99.0));
    }
}
