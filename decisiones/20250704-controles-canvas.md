# Mejorar control con teclado

## Resumen
Se enfocó el lienzo de forma automática y se cambiaron los eventos de teclado para que el jugador pueda moverse con las flechas sin problemas.

## Razonamiento
Usuarios reportaron que las flechas no desplazaban al personaje. Al escuchar los eventos directamente en el lienzo y prevenir el desplazamiento de la página se garantiza la interacción.

## Alternativas consideradas
- Mantener los eventos en `document`: seguía fallando en algunos navegadores.
- Usar controles con clic: poco práctico en teclados.

## Sugerencias
Debería añadirse soporte para dispositivos táctiles y más pruebas de accesibilidad.

