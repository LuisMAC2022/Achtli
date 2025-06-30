# Canvas a pantalla completa

## Resumen
Se actualizó `game.html` y `game.js` para que el lienzo ocupe toda la ventana del navegador.

## Razonamiento
El prototipo mostraba el lienzo con un tamaño fijo de 300x200 píxeles, lo que desperdiciaba espacio y dificultaba las pruebas de jugabilidad. Ajustando el tamaño al `viewport` se mejora la experiencia y se preparan futuras mejoras.

## Alternativas consideradas
- Mantener dimensiones fijas: menos inmersivo y requiere cambios manuales al probar en distintos dispositivos.
- Usar solo CSS sin modificar el script: no actualiza la resolución interna del lienzo.

## Sugerencias
Podrían añadirse controles para pausar o reescalar el juego tras cambiar el tamaño de la ventana.

