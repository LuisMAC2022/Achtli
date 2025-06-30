# Integrar Game WASM en game.js

## Resumen
Se instancia la clase `Game` desde JavaScript y se reemplaza el movimiento manual del jugador por llamadas a `game.move_player`. Ahora las plantas se obtienen con `game.plant_positions()` y se muestran en pantalla. El contador se actualiza al aumentar `game.collected()`.

## Razonamiento
Vincular la lógica de Rust con el código JavaScript simplifica la administración de colisiones y permite avanzar hacia una jugabilidad basada en WebAssembly.

## Alternativas consideradas
- Mantener la posición del jugador solo en JS: limita el aprendizaje con WASM.
- Sincronizar datos con mensajes postMessage: innecesario para un prototipo tan sencillo.

## Sugerencias
Faltan efectos visuales al recolectar plantas y más pruebas de interacción táctil para pulir la experiencia.

###SHA
<<git SHA>>
