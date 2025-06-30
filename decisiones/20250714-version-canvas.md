# Mostrar version en canvas

## Resumen
Se agrega el texto "version 0.0.0.0" en la esquina superior derecha del canvas utilizando `fillText`.

## Razonamiento
El usuario solicitó visualizar la versión con cada prueba y este texto permite identificar rápidamente la versión del prototipo.

## Alternativas consideradas
- Posicionar la versión en un elemento HTML externo: no cumpliría la instrucción de mostrarlo dentro del canvas.
- Usar la consola del navegador: no es visible para todos los jugadores.

## Sugerencias
El número de versión debe incrementarse manualmente en `game.js` con cada cambio futuro. Sería útil automatizar este proceso.

