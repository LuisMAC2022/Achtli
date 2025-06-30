# Fallback JS para el prototipo

## Resumen
Se implementó una versión en JavaScript del juego que se usa cuando el módulo WebAssembly no está disponible. Se añadió un atributo de accesibilidad al canvas y se actualizó la documentación con instrucciones de compilación.

## Razonamiento
Al no compilar el paquete `wasm_game` el sitio sólo mostraba un cuadro negro. Con el respaldo en JS el jugador siempre se ve y se mueve, garantizando funcionalidad básica.

## Alternativas consideradas
- Incluir los archivos generados por `wasm-pack` en el repositorio: aumenta el peso sin aportar a largo plazo.
- Omitir la versión wasm y trabajar solo con JS: se perdería el objetivo de aprender WebAssembly.

## Sugerencias
Automatizar la compilación localmente y ampliar las pruebas de accesibilidad.

###SHA
<<git SHA>>
