# Mejora de controles táctiles

## Resumen
Se añadió un sistema alternativo basado en eventos `touchstart` y `touchmove` cuando los eventos de puntero no están disponibles. Con esto el jugador puede arrastrar el cuadrado en dispositivos antiguos o navegadores sin soporte de Pointer Events.

## Razonamiento
Usuarios reportaron que el arrastre no funcionaba en algunos móviles. Detectamos que ciertos navegadores carecen de soporte para Pointer Events. Al ofrecer un respaldo con eventos táctiles se garantiza la compatibilidad.

## Alternativas consideradas
- Mantener solo Pointer Events: sigue fallando en navegadores sin soporte.
- Reescribir todo a touch events: perdería compatibilidad con escritorio.

## Sugerencias
Realizar pruebas en más dispositivos y evaluar ajustes de sensibilidad. Podría estudiarse un sistema de controles virtuales para mayor accesibilidad.

###SHA
80f21844981081b3fdabb43e16371db2c71529eb
