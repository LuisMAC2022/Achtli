# Evitar doble ejecucion del flujo

## Resumen
Se añadió la etiqueta `[skip ci]` al commit automático que actualiza el SHA en los archivos de decisiones.

## Razonamiento
El flujo se disparaba dos veces: la ejecución inicial y una segunda vez por el commit que subía la actualización del SHA. Al incluir `[skip ci]` en el mensaje, GitHub Actions ignora ese push y se evita la ejecución redundante.

## Alternativas consideradas
- Crear un flujo separado con `workflow_run`: más complejo y no necesario.
- Agregar lógica en el script para detectar commits previos: resultaba menos fiable.

## Sugerencias
La solución funciona pero se recomienda revisar periódicamente que `[skip ci]` siga siendo soportado por GitHub Actions.

###SHA
78ec53f5b337f9f3efd9b3aba32ed7ae1b630b5a
