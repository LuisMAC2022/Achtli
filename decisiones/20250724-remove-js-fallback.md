# Eliminar respaldo JS

## Resumen
Se eliminó la versión en JavaScript que funcionaba como alternativa cuando el módulo WebAssembly no estaba disponible.

## Razonamiento
Mantener dos implementaciones paralelas complicaba el mantenimiento y podía causar divergencias. Al unificar todo en Rust y wasm se simplifica el desarrollo.

## Alternativas consideradas
- Conservar ambas versiones y seguir sincronizándolas.
- Reescribir todo solo en JavaScript.

## Sugerencias
Verificar que la compilación de wasm esté automatizada para evitar regresiones y ajustar las pruebas de acuerdo con la nueva estructura.
