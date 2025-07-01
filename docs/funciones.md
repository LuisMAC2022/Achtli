# Referencia de funciones

Esta página describe brevemente las funciones disponibles en el proyecto.

## JavaScript

### js/game-logic.js
- `seedColor()` y `matureColor()` generan colores aleatorios para las plantas.
- `jsGrowthInterval(species)` define el tiempo de crecimiento según la especie.
- `jsUpdatePlants(plants, dt)` actualiza el avance de todas las plantas.
- `jsCollectAt(plants, x, y)` intenta recolectar una planta madura cercana.
- `jsFindPlantAt(plants, x, y)` devuelve el índice de una planta en las coordenadas.
- `createInitialPlants()` crea el conjunto inicial de plantas para el modo JS.

### js/ui.js
- `setupUI(canvas, overlay, plantInfo, actions)` conecta los controles del
  jugador y muestra información de cada planta.

### js/main.js
- `start()` es el punto de entrada; carga el módulo wasm y comienza el ciclo de
  dibujo.
- Funciones internas como `movePlayer()` o `draw()` gestionan la lógica de
  movimiento, colisiones y renderizado.

## Rust (wasm_game)
- `draw_pink()` pinta el fondo cuando se inicia el juego.
- `Game` gestiona la posición del jugador y las plantas. Sus métodos permiten
  mover al jugador, actualizar el estado y recolectar.
- En `growth.rs` se define el cálculo de colores y etapas de crecimiento.
