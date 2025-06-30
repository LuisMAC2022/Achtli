# Actualizar README sobre pruebas

## Resumen
Se ajustó la sección de *Pruebas automáticas* en `README.md` para indicar que ya existen tests en Rust y JavaScript. También se aclaró que `npm test` necesita `wasm-pack`.

## Razonamiento
La documentación seguía mencionando que las pruebas se agregarían en el futuro, lo cual ya no es cierto. Explicar la dependencia de `wasm-pack` evita confusiones al ejecutar `npm test`.

## Alternativas consideradas
- Mantener el mensaje anterior que hablaba de pruebas futuras.
- Describir por separado la instalación de Jest.

## Sugerencias
Ampliar las pruebas para cubrir más mecánicas del juego y aprovechar la automatización en CI.
