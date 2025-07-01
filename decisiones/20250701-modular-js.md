# Reorganizar codigo JS

## Resumen
Se separo `game.js` en modulos dentro de la carpeta `js/` para mantener responsabilidades claras.

## Razonamiento
Dividir el codigo facilita el mantenimiento y permite importar un unico punto de entrada desde `game.html`.

## Alternativas consideradas
- Mantener todo en un solo archivo.
- Usar un framework diferente para manejar modulos.

## Sugerencias
Revisar que el flujo de versionado automatico contemple ahora `js/main.js` si se desea seguir incrementando la version.
