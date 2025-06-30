# Sistema de crecimiento de plantas

## Resumen
Se añadieron estructuras y lógica para que cada planta avance de etapa con intervalos según su especie. El juego actualiza todas las plantas en cada cuadro tanto en Rust como en la versión de respaldo en JavaScript.

## Razonamiento
El prototipo necesitaba representar el ciclo de vida de distintas especies. Con una estructura dedicada y un módulo de crecimiento es posible simular tiempos realistas sin complicar el resto del código.

## Alternativas consideradas
- Mantener solo posiciones fijas sin etapas.
- Calcular el crecimiento directamente dentro de `Game` sin separar módulos.

## Sugerencias
Agregar más especies y efectos visuales para cada etapa de crecimiento.
