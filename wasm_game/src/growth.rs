pub fn interval_for_species(species: &str) -> f64 {
    match species {
        "fast" => 1.0,
        "slow" => 3600.0,
        _ => 60.0,
    }
}

use crate::Plant;
use js_sys::Math;

const MATURE_STAGE: u32 = 5;

pub fn seed_color() -> String {
    if Math::random() < 0.5 {
        "brown".into()
    } else {
        "black".into()
    }
}

fn mature_color() -> String {
    let colors = ["red", "white", "blue", "yellow"];
    let idx = (Math::random() * colors.len() as f64).floor() as usize;
    colors[idx].into()
}

pub fn update_plant(plant: &mut Plant, dt: f64) {
    plant.timer += dt;
    let interval = interval_for_species(&plant.species);
    while plant.timer >= interval {
        plant.timer -= interval;
        plant.stage += 1;
        if plant.stage == 1 {
            plant.color = "green".into();
        } else if plant.stage == MATURE_STAGE {
            plant.color = mature_color();
        }
    }
}
