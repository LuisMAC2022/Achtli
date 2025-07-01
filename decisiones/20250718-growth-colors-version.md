# Colores de crecimiento y versionado

## Resumen
Se añadió lógica de colores al sistema de crecimiento de plantas y una acción de GitHub que incrementa la versión automáticamente al hacer merge en la rama principal.

## Razonamiento
El juego necesitaba reflejar visualmente las etapas de las plantas, desde semilla hasta madurez. Además, se requería mantener actualizado el número de versión de forma automática para identificar cada despliegue.

## Alternativas consideradas
- Controlar los colores únicamente en JavaScript.
- Actualizar la versión de manera manual tras cada fusión.

## Sugerencias
Pulir la representación visual con sprites dedicados y extender el versionado a otros archivos relevantes del proyecto.
