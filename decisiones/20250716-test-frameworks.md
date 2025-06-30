# Pruebas automatizadas

## Resumen
Se agregaron pruebas unitarias en Rust usando `wasm-bindgen-test` para validar la lógica del struct `Game` y se configuró Jest para comprobar la función `jsCollectAt` en JavaScript. `package.json` ahora define un script `test` que ejecuta ambas suites.

## Razonamiento
Contar con pruebas básicas ayuda a mantener la estabilidad del juego durante futuras modificaciones. Al ejecutarlas con un solo comando se facilita la integración continua.

## Alternativas consideradas
- Ejecutar únicamente `cargo test`: no permite validar la compilación a wasm.
- Usar otra librería de pruebas JS: Jest es más sencillo de configurar para este proyecto.

## Sugerencias
La instalación de `wasm-pack` puede tardar; se podría cachear en el entorno de CI. También sería útil ampliar la cobertura con más casos de juego.

###SHA
<<git SHA>>
