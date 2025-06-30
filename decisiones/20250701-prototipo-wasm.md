# Prototipo inicial en WebAssembly

## Resumen
Se creo la carpeta `wasm_game` con un paquete Rust que maneja la logica basica del juego y expone sus funciones mediante `wasm-bindgen`. Tambien se añadieron `game.html` y `game.js` para renderizar un lienzo 2D donde un cuadrado controlado con las flechas recolecta circulos. Al tocar una planta, el contador en la esquina se incrementa.

## Razonamiento
Implementar este prototipo permite validar la integracion entre Rust, WebAssembly y JavaScript antes de escalar el motor del videojuego. Mantener la logica en Rust simplifica la evolucion futura y aprovecha el pipeline ya definido en GitHub Actions.

## Alternativas consideradas
- Codificar toda la logica en JavaScript: se descarto para seguir la meta de usar WebAssembly.
- Usar una libreria de motor completa: innecesario en esta etapa temprana.

## Sugerencias
El siguiente paso podria incluir generar las plantas en posiciones aleatorias y refinar las colisiones. Tambien conviene revisar el rendimiento del wasm generado y su tamaño al desplegar.

###SHA
0a5088f5201a2413931f4c2c1de51aee22f8de3a
