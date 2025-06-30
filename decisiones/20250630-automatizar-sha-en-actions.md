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
7b99a6746a8047f693b68391fc1d457f0d056d4a
