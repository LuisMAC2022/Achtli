# Permitir escritura a acciones

## Resumen
Se añadió la sección `permissions` con `contents: write` al flujo de trabajo de GitHub Actions.

## Razonamiento
El bot `github-actions` necesita permiso de escritura para poder actualizar los archivos de decisiones con el SHA del commit y hacer push a `main`.

## Alternativas consideradas
- Mantener los permisos por defecto: provoca errores al intentar empujar cambios.
- Crear un token personal: requiere manejo adicional de secretos.

## Sugerencias
Revisar si otros flujos requieren permisos similares para evitar fallos en futuras automatizaciones.

###SHA
<<git SHA>>
