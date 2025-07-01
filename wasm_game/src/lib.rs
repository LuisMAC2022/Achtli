use js_sys::Array;
use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;
use wasm_bindgen::JsValue;
use web_sys::{window, CanvasRenderingContext2d, HtmlCanvasElement};

mod growth;

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
pub struct Plant {
    species: String,
    stage: u32,
    timer: f64,
    x: f64,
    y: f64,
    color: String,
}

impl Plant {
    fn new(species: &str, x: f64, y: f64) -> Self {
        Self {
            species: species.to_string(),
            stage: 0,
            timer: 0.0,
            x,
            y,
            color: growth::seed_color(),
        }
    }
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
            Plant::new("fast", 50.0, 50.0),
            Plant::new("medium", 150.0, 80.0),
            Plant::new("slow", 80.0, 150.0),
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

    pub fn update(&mut self, dt: f64) {
        for plant in &mut self.plants {
            growth::update_plant(plant, dt);
        }
    }

    fn check_collisions(&mut self) {
        let mut i = 0;
        while i < self.plants.len() {
            let px = self.plants[i].x;
            let py = self.plants[i].y;
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
            let px = self.plants[i].x;
            let py = self.plants[i].y;
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


    pub fn player_x(&self) -> f64 {
        self.player_x
    }
    pub fn player_y(&self) -> f64 {
        self.player_y
    }
    pub fn plant_count(&self) -> usize {
        self.plants.len()
    }
    pub fn plant_x(&self, idx: usize) -> f64 {
        self.plants[idx].x
    }
    pub fn plant_y(&self, idx: usize) -> f64 {
        self.plants[idx].y
    }
    pub fn plant_stage(&self, idx: usize) -> u32 {
        self.plants[idx].stage
    }
    pub fn collected(&self) -> u32 {
        self.collected
    }

    pub fn plant_positions(&self) -> Array {
        let arr = Array::new();
        for plant in &self.plants {
            let quad = Array::new();
            quad.push(&JsValue::from_f64(plant.x));
            quad.push(&JsValue::from_f64(plant.y));
            quad.push(&JsValue::from_f64(plant.stage as f64));
            quad.push(&JsValue::from_str(&plant.color));
            arr.push(&quad);
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
}
