# Ejecutar script de SHA antes y retirar Jekyll

## Resumen
Se movió la actualización automática del SHA al inicio del flujo de trabajo y se eliminó la fase de Jekyll para simplificar la generación del sitio.

## Razonamiento
El paso que sustituye `<<git SHA>>` no se ejecutaba si fallaba la construcción con Jekyll. Al ejecutarlo inmediatamente después de clonar el repositorio se garantiza su correcta ejecución. Como la página ya es estática, Jekyll resultaba innecesario y era la principal fuente de fallos.

## Alternativas consideradas
- Mantener Jekyll pero intentar corregir sus errores: añade complejidad sin beneficio claro.
- Ejecutar el script al final como estaba originalmente: vuelve a fallar cuando surgen problemas en la compilación.

## Sugerencias
Revisar de forma periódica el flujo para detectar pasos redundantes y mantenerlo lo más simple posible.

###SHA
<<git SHA>>
