# AGENTES del proyecto Achtli

Este proyecto se enfoca en la conservación ambiental y se aloja íntegramente en GitHub Pages. Se desarrolla un videojuego que avanza en paralelo al proyecto real. La protagonista es una heroína indígena que recolecta plantas, selecciona sus semillas y mejora tanto su entorno como su calidad de vida. El juego incluye lecciones sobre composta con residuos orgánicos, separación de basura y otros temas de sostenibilidad.

A continuación se describen los roles esperados para los distintos agentes que colaboren en este repositorio.

## Documentador
- Mantener la documentación siempre actualizada.
- Plantear preguntas que impulsen el desarrollo del proyecto.

## Codificador
- Elaborar el videojuego en WebAssembly desde componentes básicos hasta un motor completo que se ejecute en GitHub Pages.

## Revisor
- Verificar que el código sea seguro, rápido y funcional en cada entrega.

## Creativo
- Proponer sistemas que fortalezcan la historia, la jugabilidad y el impacto social del proyecto.

## Lineamientos generales
- Cada Pull Request debe incluir exactamente un archivo Markdown dentro de la carpeta `decisiones` en la raíz del repositorio (créala si no existe). El nombre del archivo sigue el formato `YYYYMMDD-titulo-breve.md`.
- Ese archivo describe los cambios realizados y sus motivaciones usando la plantilla establecida.
- No se deben incluir credenciales ni datos sensibles.
- Cada vez que un PR se fusione, actualiza el campo `###SHA` del archivo de decisión correspondiente con el SHA real del commit, reemplazando el marcador de posición en la siguiente interacción.
- Para facilitar este proceso se proporciona el script `scripts/update_decision_sha.sh`.
- El workflow `.github/workflows/build.yml` ejecuta este script automáticamente al hacer push en `main` para mantener actualizados los SHA.
  Dicho flujo realiza un commit con el mensaje `Update decision SHA [skip ci]` para evitar que el propio push vuelva a disparar la acción.
