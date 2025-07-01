/**
 * Configura los controles y la interfaz de usuario sobre el canvas.
 */
export function setupUI(canvas, overlay, plantInfo, actions) {
  const { movePlayer, findPlantIndex, getPlantStage, getPlantSpecies } = actions;
  const speed = 5;

  let dragging = false;
  let lastX = 0;
  let lastY = 0;

  /** Inicia el arrastre del jugador mediante puntero o toque. */
  function startDrag(x, y) {
    dragging = true;
    lastX = x;
    lastY = y;
  }

  /** Desplaza al jugador mientras se arrastra el puntero. */
  function moveDrag(x, y) {
    if (!dragging) return;
    const dx = x - lastX;
    const dy = y - lastY;
    lastX = x;
    lastY = y;
    movePlayer(dx, dy);
  }

  /** Finaliza la operación de arrastre. */
  function endDrag() {
    dragging = false;
  }

  /** Muestra la información de la planta seleccionada. */
  function showOverlay(index) {
    const species = getPlantSpecies(index);
    const stage = getPlantStage(index);
    const info = plantInfo[index] || {};
    overlay.innerHTML = `<h2>${info.name || species}</h2>` +
      `<p>Fase actual: ${stage}</p>` +
      `<p>Requisitos: ${info.requirements || ''}</p>` +
      `<p>${info.desc || ''}</p>`;
    overlay.style.display = 'block';
  }

  /** Oculta el panel de información de la planta. */
  function hideOverlay() {
    overlay.style.display = 'none';
  }

  canvas.focus();
  canvas.addEventListener('keydown', (e) => {
    let dx = 0;
    let dy = 0;
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        dy = -speed;
        break;
      case 'ArrowDown':
        e.preventDefault();
        dy = speed;
        break;
      case 'ArrowLeft':
        e.preventDefault();
        dx = -speed;
        break;
      case 'ArrowRight':
        e.preventDefault();
        dx = speed;
        break;
      default:
        return;
    }
    movePlayer(dx, dy);
  });

  if (window.PointerEvent) {
    canvas.addEventListener('pointerdown', (e) => {
      const idx = findPlantIndex(e.clientX, e.clientY);
      if (idx >= 0) {
        e.stopPropagation();
        showOverlay(idx);
      } else {
        startDrag(e.clientX, e.clientY);
        canvas.setPointerCapture(e.pointerId);
      }
    });
    canvas.addEventListener('pointermove', (e) => moveDrag(e.clientX, e.clientY));
    canvas.addEventListener('pointerup', endDrag);
    canvas.addEventListener('pointercancel', endDrag);
  } else {
    canvas.addEventListener('touchstart', (e) => {
      const t = e.touches[0];
      const idx = findPlantIndex(t.clientX, t.clientY);
      if (idx >= 0) {
        e.stopPropagation();
        showOverlay(idx);
      } else {
        startDrag(t.clientX, t.clientY);
      }
    }, { passive: false });
    canvas.addEventListener('touchmove', (e) => {
      const t = e.touches[0];
      moveDrag(t.clientX, t.clientY);
    }, { passive: false });
    canvas.addEventListener('touchend', endDrag);
    canvas.addEventListener('touchcancel', endDrag);
  }

  document.addEventListener('pointerdown', (e) => {
    if (overlay.style.display === 'block' && !overlay.contains(e.target)) {
      hideOverlay();
    }
  });
}
