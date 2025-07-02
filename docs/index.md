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

## Pruebas automáticas
El repositorio cuenta con pruebas en **Rust**. Puedes ejecutarlas con:
```bash
cargo test       # pruebas de Rust
npm test         # pruebas de wasm (requiere wasm-pack)
```
Asegúrate de que `wasm-pack` esté instalado y disponible en tu `PATH`, ya que `npm test` lo utiliza para compilar y ejecutar la biblioteca WebAssembly. Las pruebas automatizadas verifican que cada parte del proyecto funcione como se espera y se ejecutarán también en GitHub Actions cuando envíes código al repositorio.

Para conocer cada función disponible, revisa la [referencia de funciones](funciones.md).

cambios por añadir:

-> sustituir imagenes de baja resolucion con mapas de google (falta creacion de api de google)
-> asegurarse que el diseño sea accesible
