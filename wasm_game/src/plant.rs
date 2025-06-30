pub struct Plant {
    pub species: String,
    pub stage: u32,
    pub timer: f64,
    pub x: f64,
    pub y: f64,
}

impl Plant {
    pub fn new(species: &str, x: f64, y: f64) -> Self {
        Self {
            species: species.to_string(),
            stage: 0,
            timer: 0.0,
            x,
            y,
        }
    }
}
