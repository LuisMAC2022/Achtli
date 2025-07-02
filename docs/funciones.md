# Referencia de funciones

Esta página describe brevemente las funciones disponibles en el proyecto.

## JavaScript

### [js/ui.js](../js/ui.js)
<details>
<summary><code>setupUI(canvas, overlay, plantInfo, actions)</code></summary>
Conecta los controles del jugador y muestra información de cada planta.
</details>

### [js/main.js](../js/main.js)
<details>
<summary><code>start()</code></summary>
Carga el módulo wasm y comienza el ciclo de dibujo.
</details>

<details>
<summary><code>movePlayer()</code> y <code>draw()</code></summary>
Gestionan la lógica de movimiento, colisiones y renderizado.
</details>

## Rust (wasm_game)

### [wasm_game/src/lib.rs](../wasm_game/src/lib.rs)
<details>
<summary><code>draw_pink()</code></summary>
Pinta el fondo cuando se inicia el juego.
</details>

<details>
<summary><code>Game</code></summary>
Gestiona la posición del jugador y las plantas. Sus métodos permiten mover al jugador, actualizar el estado y recolectar.
</details>

### [wasm_game/src/growth.rs](../wasm_game/src/growth.rs)
<details>
<summary><code>growth.rs</code></summary>
Define el cálculo de colores y etapas de crecimiento.
</details>
