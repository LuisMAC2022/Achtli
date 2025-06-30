# Achtli
Este es un proyecto que busca recuperar la memoria mexica por medio del rescate al medio ambiente.

## Ejecutar el prototipo

Para que el lienzo muestre al jugador en movimiento es necesario compilar el paquete WebAssembly:

```bash
wasm-pack build --target web wasm_game
```

Si la compilación no está disponible, el juego utiliza una versión en JavaScript puro como respaldo.

## Respaldo en JavaScript

El archivo `game.js` replica la misma mecánica implementada en Rust para `wasm_game`.  Mueve al personaje,
detecta colisiones y lleva el conteo de plantas igual que la biblioteca WebAssembly.  Así el título sigue
funcionando si el módulo wasm falla o no se compila.

Para mantener la coherencia, actualiza el código JavaScript y el Rust al mismo tiempo cada que
modifiques la lógica del juego.  Conserva la misma interfaz pública y verifica el comportamiento en ambos
entornos para evitar divergencias.

### ¿Ventaja o desventaja?

Tener dos implementaciones ayuda a depurar y garantiza accesibilidad, pero duplica el esfuerzo de
mantenimiento.  Decide si conservar el espejo en JS según el tiempo disponible y la utilidad que aporte.

Abre `game.html` en un navegador moderno y usa las flechas para mover al personaje.

cambios por añadir:

-> sustituir imagenes de baja resolucion con mapas de google (falta creacion de api de google)
-> asegurarse que el diseño sea accesible 
