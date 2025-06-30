# Achtli
Este es un proyecto que busca recuperar la memoria mexica por medio del rescate al medio ambiente.

## Instalación
Asegúrate de tener las herramientas básicas para compilar el módulo WebAssembly y ejecutar el prototipo.

1. **Instalar Rust**
   - Visita <https://www.rust-lang.org/tools/install> y sigue las instrucciones.
   - En la mayoría de los sistemas puedes ejecutar:
     ```bash
     curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
     ```
   - Comprueba que Rust quedó listo con `rustc --version`.
2. **Instalar Node.js**
   - Descarga la versión LTS desde <https://nodejs.org/> o usa el gestor de paquetes de tu sistema.
   - Verifica la instalación con `node --version`.
3. **Instalar wasm-pack**
   - Con Rust ya instalado ejecuta:
     ```bash
     curl -sSf https://rustwasm.github.io/wasm-pack/installer/init.sh | sh
     ```
   - Comprueba que el comando `wasm-pack` funciona ejecutando `wasm-pack --version`.

## Ejecutar el prototipo
1. Genera los archivos WebAssembly:
   ```bash
   wasm-pack build --target web wasm_game
   ```
2. Abre `game.html` en un navegador moderno. Puedes hacerlo directamente o sirviendo la carpeta con un pequeño servidor web.
3. Usa las flechas del teclado o los controles táctiles para mover al personaje.

Si la compilación no está disponible, el juego utiliza automáticamente una versión en JavaScript como respaldo.

## Pruebas automáticas
Próximamente se añadirá una suite de pruebas para validar el código. Una vez que exista podrás ejecutarla con:
```bash
cargo test       # para las pruebas de Rust
npm test         # para las pruebas de JavaScript
```
Las pruebas automatizadas ejecutan pequeños programas que verifican que cada parte del proyecto funcione como se espera. Esto ayuda a detectar errores antes de publicar los cambios y se ejecutará de forma automática en GitHub Actions cuando envíes código al repositorio.

cambios por añadir:

-> sustituir imagenes de baja resolucion con mapas de google (falta creacion de api de google)
-> asegurarse que el diseño sea accesible
