# Automatizar SHA en Actions

## Resumen
Se añadió un paso en `.github/workflows/build.yml` que ejecuta el script `scripts/update_decision_sha.sh` para reemplazar el marcador `<<git SHA>>` en los archivos de decisiones y subir el cambio.

## Razonamiento
Automatizar el reemplazo evita olvidos humanos y mantiene las referencias correctas en cada merge.

## Alternativas consideradas
- Hacer el reemplazo manual: propenso a fallos.
- Utilizar un action externo: innecesario para este proyecto.

## Sugerencias
Podría mejorarse detectando automáticamente el archivo modificado y evitando disparar el flujo dos veces.

###SHA
f6c804c6a611dab4ea5bb7a027f2c8c3dc78df9c
