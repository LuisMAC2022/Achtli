# Controles tactiles

## Resumen
Se añadio `touch-action: none` en `style.css` y se implementaron eventos de puntero en `game.js` para mover al jugador con arrastres.

## Razonamiento
Estas mejoras permiten controlar el juego en dispositivos moviles sin desplazamiento de la pagina y manteniendo los controles de teclado para escritorio.

## Alternativas consideradas
- Mantener solo controles de teclado: no funcionaria en pantallas tactiles.
- Usar eventos `touchstart` y similares: menos consistente que los eventos de puntero.

## Sugerencias
Se podria añadir retroalimentacion visual al tocar el lienzo y ajustar la sensibilidad del arrastre.

###SHA
0a5088f5201a2413931f4c2c1de51aee22f8de3a
