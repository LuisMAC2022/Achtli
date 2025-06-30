# Automatizar actualizacion de SHA

## Resumen
Se agrega un script Bash `scripts/update_decision_sha.sh` que inserta el commit actual en el campo correspondiente de un archivo de decisiones.

## Razonamiento
Automatizar la sustitucion evita olvidos y garantiza que las referencias a commits sean correctas en cada merge.

## Alternativas consideradas
- Hacer el reemplazo manual en cada PR: propenso a errores.
- Usar una herramienta externa: innecesario para un cambio simple.

## Sugerencias
El script podria ejecutarse como parte de un flujo de GitHub Actions al fusionar PR para mantener todo automatizado.

###SHA
78ec53f5b337f9f3efd9b3aba32ed7ae1b630b5a
