# Paridad JS-Rust en README

## Resumen
Se agregó una breve sección en `README.md` que describe cómo el respaldo en JavaScript imita la lógica de Rust y consejos para mantener ambos lenguajes sincronizados. También se analiza si mantener dos implementaciones es fortaleza o debilidad.

## Razonamiento
La documentación original solo mencionaba que existía un fallback en JS pero no explicaba su relación con el código Rust ni cómo conservar la coherencia entre ambas versiones. Esta información ayuda a futuros colaboradores a entender el diseño actual.

## Alternativas consideradas
- Omitir la explicación y asumir que el código se entiende por sí mismo: se pierde contexto.
- Crear un documento separado: dispersa la información básica.

## Sugerencias
Mantener un registro de cambios en el juego para detectar rápidamente divergencias entre las versiones y considerar eliminar el fallback cuando todos los usuarios tengan soporte WebAssembly.

###SHA
<<git SHA>>
