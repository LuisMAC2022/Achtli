# Corregir controles tactiles

## Resumen
Se enlazo `style.css` en `game.html` para aplicar la regla `touch-action: none` al lienzo y permitir el arrastre en dispositivos moviles.

## Razonamiento
Sin esta hoja de estilos, el navegador ignoraba la desactivacion de gestos táctiles y el arrastre no funcionaba. Al cargar la hoja global se unifican estilos y se habilita el movimiento con toques.

## Alternativas consideradas
- Copiar la regla directamente en la etiqueta `<style>`: Duplica estilos y puede desincronizarse.
- Mantener el comportamiento previo: impide jugar desde moviles.

## Sugerencias
Seria conveniente revisar periodicamente que las paginas incluyan los estilos necesarios y evitar duplicaciones.

###SHA
bc829502d541630d9a034b44e22af85808ae70eb
