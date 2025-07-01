/// Devuelve el intervalo de crecimiento de acuerdo con la especie.
pub fn interval_for_species(species: &str) -> f64 {
    match species {
        "fast" => 1.0,
        "slow" => 3600.0,
        _ => 60.0,
    }
}

use crate::Plant;
use js_sys::Math;

/// Etapa máxima de crecimiento de una planta.
pub const MATURE_STAGE: u32 = 5;

/// Genera un color inicial para la semilla.
pub fn seed_color() -> String {
    if Math::random() < 0.5 {
        "brown".into()
    } else {
        "black".into()
    }
}

/// Color aleatorio asignado al alcanzar la madurez.
fn mature_color() -> String {
    let colors = ["red", "white", "blue", "yellow"];
    let idx = (Math::random() * colors.len() as f64).floor() as usize;
    colors[idx].into()
}

/// Avanza el estado de una planta con el tiempo transcurrido.
pub fn update_plant(plant: &mut Plant, dt: f64) {
    if plant.stage >= MATURE_STAGE {
        return;
    }
    plant.timer += dt;
    let interval = interval_for_species(&plant.species);
    while plant.stage < MATURE_STAGE && plant.timer >= interval {
        plant.timer -= interval;
        plant.stage += 1;
        if plant.stage == 1 {
            plant.color = "green".into();
        } else if plant.stage == MATURE_STAGE {
            plant.color = mature_color();
        }
    }
}
