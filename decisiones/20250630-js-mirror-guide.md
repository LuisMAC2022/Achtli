# Guiar espejo JS

## Resumen
Se añadió una sección al README explicando que `game.js` imita la implementación Rust y recomendaciones para mantener ambas versiones en sintonía.

## Razonamiento
El README ahora orienta sobre la relación entre Rust y JavaScript, facilitando la coherencia del proyecto cuando no se pueda compilar WebAssembly.

## Alternativas consideradas
- Limitar la documentación a la versión wasm: deja dudas sobre el respaldo en JS.
- Descartar la versión JS por completo: se perdería la accesibilidad cuando falla la compilación.

## Sugerencias
El doble mantenimiento podría simplificarse con pruebas compartidas o herramientas de generación de código.

###SHA
<<git SHA>>
