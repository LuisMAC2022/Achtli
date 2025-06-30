# Eliminar automatizacion SHA

## Resumen
Se elimino el script que actualizaba automaticamente el SHA en los archivos de decisiones y se quito el paso correspondiente del flujo de GitHub Actions. Tambien se eliminaron las secciones de SHA en las decisiones existentes.

## Razonamiento
El mantenimiento de esta funcionalidad agregaba complejidad y commits extra sin aportar valor tangible al proyecto.

## Alternativas consideradas
- Mantener el script y el paso en Actions: descartado por innecesario.
- Actualizar los SHA manualmente: prescindible al remover la seccion.

## Sugerencias
Simplificar el flujo reduce posibles errores. Si en el futuro se requiere rastrear los SHA, podria implementarse una solucion diferente.

###SHA
<<git SHA>>
