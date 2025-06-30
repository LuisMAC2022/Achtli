# Corregir action de Rust

## Resumen
Se actualizo la configuracion del workflow para usar `rust-lang/setup-rust@v1` en lugar de `actions/setup-rust@v1`.

## Razonamiento
La accion anterior no existe y producia el error "Unable to resolve action actions/setup-rust@v1" impidiendo compilar el paquete WASM y desplegar la pagina.

## Alternativas consideradas
- Instalar Rust manualmente con scripts: mas complejo y propenso a fallos.
- Usar `actions-rs/toolchain`: requiere mas configuracion especifica para wasm.

## Sugerencias
Futuras mejoras podrian integrar pruebas automatizadas para verificar la construccion del juego y agregar soporte para varias versiones de Rust.

