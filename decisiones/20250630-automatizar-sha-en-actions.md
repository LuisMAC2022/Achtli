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
8f326f57cbd180e6e6ad3a7ca7b4839e51c421ba
