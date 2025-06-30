# Sistema de crecimiento de plantas

## Resumen
Se añade una estructura `Plant` y un modulo `growth` para manejar las etapas de crecimiento en el juego. `Game` actualiza todas las plantas en cada cuadro y la versión en JavaScript replica el nuevo comportamiento.

## Razonamiento
Modelar las plantas permite simular su evolución con diferentes intervalos de tiempo por especie y mantener sincronizadas las implementaciones WebAssembly y JavaScript.

## Alternativas consideradas
- Usar solo temporizadores globales.
- Mantener el estado de crecimiento en JavaScript únicamente.

## Sugerencias
- Ajustar los intervalos de crecimiento según pruebas de jugabilidad.
- Ampliar las especies con características propias.
