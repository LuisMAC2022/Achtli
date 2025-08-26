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
Inicializa el prototipo en JavaScript y comienza el ciclo de juego.
</details>

<details>
<summary><code>Plant</code>, <code>Game</code></summary>
Modelan el crecimiento de las plantas, la aparición de insectos y el movimiento del jugador.
</details>

## Rust (wasm_game)
El motor en WebAssembly usado anteriormente permanece en el repositorio como referencia histórica, pero no es necesario para ejecutar el prototipo en JavaScript.
