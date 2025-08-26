# Achtli
Este es un proyecto que busca recuperar la memoria mexica por medio del rescate al medio ambiente.

## Instalación
Este prototipo inicial funciona únicamente con JavaScript, por lo que no requiere compilar WebAssembly. Basta con contar con un navegador moderno.

## Ejecutar el prototipo
1. Abre `game.html` en tu navegador favorito.
2. Usa las flechas del teclado o los controles táctiles para mover al personaje y observar el crecimiento de las plantas y la aparición de insectos.

## Plantas e insectos
- **Cempasúchil**: crece rápido, requiere riego constante y produce pétalos.
- **Maguey**: ritmo medio, necesita sol intenso y genera frutos.
- **Maíz**: crecimiento lento, requiere suelo fértil y entrega semillas.

Los insectos aparecen cuando las plantas maduran:
- **Abeja** consume pétalos y otorga +1 punto.
- **Mariposa** consume frutos y otorga +2 puntos.
- **Chapulín** consume semillas y otorga +3 puntos.

## Pruebas automáticas
El repositorio cuenta con pruebas en **Rust**. Puedes ejecutarlas con:
```bash
cargo test       # pruebas de Rust
npm test         # pruebas de la biblioteca WebAssembly
```
Las pruebas automatizadas verifican que cada parte del proyecto funcione como se espera y se ejecutarán también en GitHub Actions cuando envíes código al repositorio.

cambios por añadir:

-> sustituir imagenes de baja resolucion con mapas de google (falta creacion de api de google)
-> asegurarse que el diseño sea accesible
