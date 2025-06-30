use crate::Plant;
use crate::Species;

/// Returns the update interval in seconds for a given species.
pub fn update_interval(species: Species) -> f32 {
    match species {
        Species::Bean => 1.0,      // every second
        Species::Corn => 60.0,     // every minute
        Species::Cactus => 3600.0, // every hour
    }
}

/// Advance the plant growth based on elapsed time in seconds.
pub fn update_plant(plant: &mut Plant, dt: f32) {
    plant.timer += dt;
    let interval = update_interval(plant.species);
    if plant.timer >= interval {
        plant.timer = 0.0;
        if plant.stage < 3 {
            plant.stage += 1;
        }
    }
}
