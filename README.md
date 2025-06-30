# Achtli
Este es un proyecto que busca recuperar la memoria mexica por medio del rescate al medio ambiente.

## Ejecutar el prototipo

Para que el lienzo muestre al jugador en movimiento es necesario compilar el paquete WebAssembly:

```bash
wasm-pack build --target web wasm_game
```

Si la compilación no está disponible, el juego utiliza una versión en JavaScript puro como respaldo.

Abre `game.html` en un navegador moderno y usa las flechas para mover al personaje.

cambios por añadir:

-> sustituir imagenes de baja resolucion con mapas de google (falta creacion de api de google)
-> asegurarse que el diseño sea accesible 
