# Plant growth system

## Resumen
Se agregó una estructura `Plant` en el código Rust y una lógica de crecimiento por especies. También se replicó el comportamiento en el archivo `game.js` para cuando no se cargue el módulo wasm.

## Razonamiento
Era necesario modelar las plantas con etapas de crecimiento para ampliar la jugabilidad y abrir la puerta a nuevas mecánicas dentro del prototipo.

## Alternativas consideradas
- Llevar el control de crecimiento solo en JavaScript.
- Actualizar las plantas mediante intervalos externos.

## Sugerencias
Extender el sistema de especies para definir características propias y visualizar las etapas con gráficos más elaborados.
