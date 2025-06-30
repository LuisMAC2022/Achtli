# Recoleccion tactil de plantas

## Resumen
Se añade una meta etiqueta `viewport` para mejorar el control en móviles y se implementa la interacción directa con las plantas. Al tocar un círculo este desaparece y el contador aumenta.

## Razonamiento
Sin la etiqueta `viewport` las coordenadas táctiles no coincidían con el lienzo y era difícil mover al personaje. Además se buscó una forma sencilla de recolectar plantas en dispositivos táctiles tocándolas directamente.

## Alternativas consideradas
- Mantener solo la recolección por colisión con el jugador: menos intuitivo en pantallas táctiles.
- Usar solo JavaScript sin actualizar el módulo Rust: duplicaría la lógica del juego.

## Sugerencias
Se podría animar la desaparición de la planta y generar posiciones aleatorias para mayor rejugabilidad.

