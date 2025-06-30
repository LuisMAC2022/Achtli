# Corregir etiquetas HTML

## Resumen
Se corrigieron varios errores de cierre de etiquetas en `index.html`.

## Razonamiento
Los enlaces y parrafos mal cerrados podian romper la estructura de la pagina y afectar la navegacion. Se limpiaron las etiquetas para asegurar un HTML valido.

## Alternativas consideradas
- Mantener el archivo igual: dejaria enlaces rotos.
- Reescribir todo el fragmento: innecesario para la magnitud del problema.

## Sugerencias
Fue simple localizar los cierres erróneos con `sed`. A futuro, integrar un validador HTML automatico ayudaria a prevenir regresiones.

###SHA
99537b07fa859836e7d81b95f95c9fe582b8ea4e
