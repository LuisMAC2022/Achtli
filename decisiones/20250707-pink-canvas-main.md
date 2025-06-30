# Cambiar workflow y canvas

## Resumen
Se ajusto el workflow para enviar los cambios a `main` y se modifico el modulo de Rust para que pinte el canvas de color rosa.

## Razonamiento
Al indicarle a `git push` la rama `main` se evita el error de permisos reportado por GitHub Actions. Se simplifico el prototipo dejando un lienzo rosa desde el codigo Rust para facilitar las pruebas.

## Alternativas consideradas
- Mantener el push generico: seguia fallando.
- Dibujar el color solo con JavaScript: no validaba el cambio del programa en Rust.

## Sugerencias
Agregar pruebas que verifiquen el flujo de despliegue y documentar mejor las fases del prototipo.

###SHA
<<git SHA>>
