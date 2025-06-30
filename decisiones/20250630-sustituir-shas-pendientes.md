# Actualizar SHAs pendientes

## Resumen
Se ejecuto el script `scripts/update_decision_sha.sh` para insertar los SHA reales en los archivos de decisiones que aun contenian el marcador `<<git SHA>>`.

## Razonamiento
Mantener las referencias correctas ayuda a rastrear cada decision. Los archivos se habian quedado con valores temporales.

## Alternativas consideradas
- Esperar a que el flujo automatico los actualizara: se queria corregir de inmediato.
- Borrar las referencias por completo: perderia trazabilidad.

## Sugerencias
El script es efectivo, pero se podria integrar una validacion previa al merge para evitar que queden pendientes.

###SHA
78ec53f5b337f9f3efd9b3aba32ed7ae1b630b5a
