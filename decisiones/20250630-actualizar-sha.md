# Actualizar SHA en decisiones

## Resumen
Se reemplazaron los identificadores de commit temporales por los SHA reales en los archivos de decisiones existentes. También se añadió una indicación en `AGENTS.md` para actualizar estas referencias tras cada fusión.

## Razonamiento
Mantener los SHA correctos facilita rastrear en qué commit se introdujo cada cambio y evita confusiones sobre el historial del proyecto.

## Alternativas consideradas
- Mantener los valores ficticios: descartado por falta de precisión.
- Crear un historial separado: innecesario y más complejo.

## Sugerencias
Este proceso podría automatizarse con un script que actualice los archivos de decisiones al cerrar el PR.

###SHA
9aa542417e6f7ef2b5d161db3c29d070d184093c
