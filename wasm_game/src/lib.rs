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
#[derive(Clone)]
struct Plant {
    x: f64,
    y: f64,
    mature: bool,
}

#[wasm_bindgen]
pub struct Game {
    width: f64,
    height: f64,
    player_x: f64,
    player_y: f64,
    plants: Vec<Plant>,
    collected: u32,
}

#[wasm_bindgen]
impl Game {
    #[wasm_bindgen(constructor)]
    pub fn new(width: f64, height: f64) -> Game {
        let plants = vec![
            Plant { x: 50.0, y: 50.0, mature: true },
            Plant { x: 150.0, y: 80.0, mature: false },
            Plant { x: 80.0, y: 150.0, mature: true },
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
            let plant = &self.plants[i];
            let dx = self.player_x - plant.x;
            let dy = self.player_y - plant.y;
            if plant.mature && (dx * dx + dy * dy).sqrt() < 20.0 {
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
            let plant = &self.plants[i];
            let dx = x - plant.x;
            let dy = y - plant.y;
            if plant.mature && (dx * dx + dy * dy).sqrt() < 20.0 {
                self.plants.remove(i);
                self.collected += 1;
                collected = true;
            } else {
                i += 1;
            }
        }
        collected
    }

    pub fn plant_index_at(&self, x: f64, y: f64) -> i32 {
        for (i, (px, py)) in self.plants.iter().enumerate() {
            let dx = x - *px;
            let dy = y - *py;
            if (dx * dx + dy * dy).sqrt() < 20.0 {
                return i as i32;
            }
        }
        -1
    }

    pub fn player_x(&self) -> f64 { self.player_x }
    pub fn player_y(&self) -> f64 { self.player_y }
    pub fn plant_count(&self) -> usize { self.plants.len() }
    pub fn plant_x(&self, idx: usize) -> f64 { self.plants[idx].x }
    pub fn plant_y(&self, idx: usize) -> f64 { self.plants[idx].y }
    pub fn plant_mature(&self, idx: usize) -> bool { self.plants[idx].mature }
    pub fn collected(&self) -> u32 { self.collected }

    pub fn plant_positions(&self) -> Array {
        let arr = Array::new();
        for plant in &self.plants {
            let pair = Array::new();
            pair.push(&JsValue::from_f64(plant.x));
            pair.push(&JsValue::from_f64(plant.y));
            pair.push(&JsValue::from_bool(plant.mature));
            arr.push(&pair);
        }
        arr
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use wasm_bindgen_test::*;


    #[wasm_bindgen_test]
    fn move_player_bounds() {
        let mut game = Game::new(100.0, 100.0);
        game.move_player(200.0, -50.0);
        assert_eq!(game.player_x(), 100.0);
        assert_eq!(game.player_y(), 0.0);
    }

    #[wasm_bindgen_test]
    fn collect_at_removes_plant() {
        let mut game = Game::new(100.0, 100.0);
        let x = game.plant_x(0);
        let y = game.plant_y(0);
        let initial = game.plant_count();
        assert!(game.collect_at(x, y));
        assert_eq!(game.plant_count(), initial - 1);
        assert_eq!(game.collected(), 1);
    }

    #[wasm_bindgen_test]
    fn collect_at_ignores_immature() {
        let mut game = Game::new(100.0, 100.0);
        let x = game.plant_x(1);
        let y = game.plant_y(1);
        let initial = game.plant_count();
        assert!(!game.collect_at(x, y));
        assert_eq!(game.plant_count(), initial);
        assert_eq!(game.collected(), 0);
    }
}
