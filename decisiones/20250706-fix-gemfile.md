# Configurar Gemfile para Jekyll

## Resumen
Se añade un archivo Gemfile con las dependencias necesarias para que Jekyll pueda generar el sitio en GitHub Actions.

## Razonamiento
La acción de compilación fallaba al no encontrar un Gemfile, lo que impedía instalar Jekyll y sus temas. Con este cambio se instala `jekyll` y `jekyll-theme-minimal`.

## Alternativas consideradas
- Crear la configuración desde GitHub Pages directamente: se descartó porque se requiere control de dependencias en el repositorio.

## Sugerencias
La generación local mostró advertencias de Sass; en el futuro convendría migrar a la nueva sintaxis.

###SHA
<<git SHA>>
