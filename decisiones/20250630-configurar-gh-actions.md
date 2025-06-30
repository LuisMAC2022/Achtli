# Configurar GitHub Actions

## Resumen
Se agregó un flujo de trabajo en `.github/workflows/build.yml` que configura Rust y Node, compila el proyecto WebAssembly con `wasm-pack`, construye el sitio con Jekyll y despliega a `gh-pages`.

## Razonamiento
Es necesario automatizar la generación y despliegue del videojuego y la página. Un flujo de trabajo centralizado reduce errores y asegura que la versión en `gh-pages` esté actualizada.

## Alternativas consideradas
- Usar solo compilaciones locales: descartado por ser propenso a fallos humanos.
- Emplear otro action para despliegue: se consideró `actions/deploy-pages`, pero se eligió `peaceiris/actions-gh-pages` por su facilidad y uso extendido.

## Sugerencias
La configuración podría ampliarse para ejecutar pruebas automáticas y publicar artefactos del juego. Futuras mejoras pueden incluir manejo de versiones y deploy condicional según entornos.

###SHA
8da1e6b23a4dbbc499d6e6a05d9e7635ea3e9376
