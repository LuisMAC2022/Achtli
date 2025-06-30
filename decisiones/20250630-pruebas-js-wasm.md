# Pruebas JS y WASM

## Resumen
Se agregaron pruebas automáticas para la lógica del juego en Rust y para funciones clave en JavaScript. También se configuró Jest y un script de npm para ejecutar ambas suites de pruebas.

## Razonamiento
Contar con pruebas facilita detectar regresiones en el motor del juego y en la lógica alternativa en JavaScript. Además, integrar todo en un solo comando simplifica la validación continua del proyecto.

## Alternativas consideradas
- Ejecutar solo pruebas en Rust: se descartó para cubrir también el modo JavaScript.
- Utilizar otro framework de JS: Jest es sencillo de configurar y suficiente por ahora.

## Sugerencias
Fue necesario modificar `game.js` para exportar la función a probar y permitir la ejecución condicional del arranque del juego. A futuro podría separarse mejor la lógica para favorecer el testeo y reutilización.

###SHA
3acfc8aa912f4d529e9d0de4a2c2c9aff74d40f2
