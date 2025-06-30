# Instrucciones básicas en README

## Resumen
Se agregan pasos detallados para instalar Rust, Node y wasm-pack. También se explica cómo compilar el proyecto, abrir `game.html` y cómo se ejecutará la futura suite de pruebas. Se incluye una breve descripción de las pruebas automatizadas.

## Razonamiento
El README anterior era escueto y no orientaba a usuarios sin experiencia técnica. Con estas indicaciones es más sencillo empezar a colaborar y comprender el flujo de trabajo.

## Alternativas consideradas
- Mantener sólo la referencia a `wasm-pack` sin detallar la instalación: arriesga a que los nuevos contribuyentes se frustren.
- Crear un documento aparte para la instalación: el README es el primer punto de contacto, por lo que se decidió ampliarlo ahí.

## Sugerencias
Sería útil añadir un script que automatice la instalación de dependencias y la ejecución de pruebas.
