use crate::plant::Plant;

pub fn interval_for_species(species: &str) -> f64 {
    match species {
        "fast" => 1.0,    // seconds
        "medium" => 60.0, // minutes
        "slow" => 3600.0, // hours
        _ => 10.0,
    }
}

pub fn update(plant: &mut Plant, dt: f64) {
    plant.timer += dt;
    let interval = interval_for_species(&plant.species);
    while plant.timer >= interval {
        plant.timer -= interval;
        plant.stage += 1;
    }
}
