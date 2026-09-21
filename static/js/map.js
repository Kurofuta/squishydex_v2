// ==========================================================================
// SYSTÈME DE CARTE INTERACTIVE (PAN & ZOOM) - SquishyDex
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  const viewport = document.getElementById("map_viewport");
  if (!viewport) return;

  // 1. Récupération ou création automatique du conteneur de carte et de l'image
  let mapContainer = viewport.querySelector(".map-container") || viewport.querySelector("#map_world");
  let mapImg = viewport.querySelector("img");

  if (!mapContainer && !mapImg) {
    // Si la balise <img> n'a pas encore été insérée dans le HTML
    mapContainer = document.createElement("div");
    mapContainer.className = "map-container";

    mapImg = document.createElement("img");
    mapImg.src = "static\\images\\islands\\main_island.png";
    mapImg.alt = "Carte du monde";
    mapImg.draggable = false;

    mapContainer.appendChild(mapImg);
    viewport.innerHTML = "";
    viewport.appendChild(mapContainer);
  } else if (!mapContainer && mapImg) {
    // Si une image est déjà présente directement dans le viewport
    mapContainer = mapImg;
  }

  // Styles de base indispensables appliqués au conteneur
  mapContainer.style.position = "absolute";
  mapContainer.style.top = "0";
  mapContainer.style.left = "0";
  mapContainer.style.transformOrigin = "0 0";
  mapContainer.style.willChange = "transform";
  mapContainer.style.userSelect = "none";
  mapContainer.style.webkitUserDrag = "none";

  if (mapImg) {
    mapImg.style.display = "block";
    mapImg.style.pointerEvents = "none";
    mapImg.style.userSelect = "none";
    mapImg.style.webkitUserDrag = "none";
  }

  // 2. Variables de position et de zoom
  let scale = 1;
  const minScale = 0.5;
  const maxScale = 3.0;

  let translateX = 0;
  let translateY = 0;

  let isDragging = false;
  let startX = 0;
  let startY = 0;

  // Gestion du pinch-to-zoom (mobile / tactile)
  let initialPinchDistance = null;
  let initialScale = 1;

  // 3. Fonction d'application de la transformation
  function updateTransform() {
    mapContainer.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`;
  }

  // 4. Centrage initial de la carte dans l'écran
  function centerMap() {
    const vpWidth = viewport.clientWidth || window.innerWidth;
    const vpHeight = viewport.clientHeight || window.innerHeight;

    const imgWidth = mapImg?.naturalWidth || mapContainer.offsetWidth || 1920;
    const imgHeight = mapImg?.naturalHeight || mapContainer.offsetHeight || 1080;

    // Définir un zoom initial adapté pour couvrir une bonne partie de l'écran
    scale = Math.max(vpWidth / imgWidth, vpHeight / imgHeight, 0.85);

    // Centrer l'image
    translateX = (vpWidth - imgWidth * scale) / 2;
    translateY = (vpHeight - imgHeight * scale) / 2;

    updateTransform();
  }

  if (mapImg && !mapImg.complete) {
    mapImg.addEventListener("load", centerMap);
  } else {
    // Si l'image est déjà chargée ou en cache
    setTimeout(centerMap, 50);
  }

  // Recentrer lors d'un redimensionnement de la fenêtre
  window.addEventListener("resize", () => {
    clampBounds();
    updateTransform();
  });

  // 5. Limitation des bords (pour ne pas perdre la carte dans le vide)
  function clampBounds() {
    const vpWidth = viewport.clientWidth || window.innerWidth;
    const vpHeight = viewport.clientHeight || window.innerHeight;

    const currentWidth = (mapImg?.naturalWidth || mapContainer.offsetWidth || 1920) * scale;
    const currentHeight = (mapImg?.naturalHeight || mapContainer.offsetHeight || 1080) * scale;

    // Marge de tolérance autorisée (en px)
    const margin = 120;

    const minX = vpWidth - currentWidth - margin;
    const maxX = margin;
    const minY = vpHeight - currentHeight - margin;
    const maxY = margin;

    if (currentWidth <= vpWidth) {
      translateX = (vpWidth - currentWidth) / 2;
    } else {
      translateX = Math.min(Math.max(translateX, minX), maxX);
    }

    if (currentHeight <= vpHeight) {
      translateY = (vpHeight - currentHeight) / 2;
    } else {
      translateY = Math.min(Math.max(translateY, minY), maxY);
    }
  }

  // 6. ÉVÉNEMENTS SOURIS (Déplacement & Drag)
  viewport.addEventListener("mousedown", (e) => {
    // Clic gauche uniquement
    if (e.button !== 0) return;

    isDragging = true;
    startX = e.clientX - translateX;
    startY = e.clientY - translateY;
    viewport.style.cursor = "grabbing";
    mapContainer.style.transition = "none";
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    translateX = e.clientX - startX;
    translateY = e.clientY - startY;

    clampBounds();
    updateTransform();
  });

  const stopDrag = () => {
    if (isDragging) {
      isDragging = false;
      viewport.style.cursor = "grab";
    }
  };

  window.addEventListener("mouseup", stopDrag);
  window.addEventListener("blur", stopDrag);

  // 7. ÉVÉNEMENT MOLETTE (Zoom centré sur le curseur)
  viewport.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();

      const rect = viewport.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const zoomIntensity = 0.12;
      const delta = e.deltaY < 0 ? 1 : -1;
      const factor = 1 + delta * zoomIntensity;

      const targetScale = scale * factor;
      const newScale = Math.min(Math.max(targetScale, minScale), maxScale);

      if (newScale === scale) return;

      // Conserver le point sous le curseur à la même position à l'écran
      translateX = mouseX - (mouseX - translateX) * (newScale / scale);
      translateY = mouseY - (mouseY - translateY) * (newScale / scale);
      scale = newScale;

      clampBounds();
      updateTransform();
    },
    { passive: false }
  );

  // 8. ÉVÉNEMENTS TACTILES (Mobile / Tablettes)
  viewport.addEventListener(
    "touchstart",
    (e) => {
      if (e.touches.length === 1) {
        // Pan à un doigt
        isDragging = true;
        startX = e.touches[0].clientX - translateX;
        startY = e.touches[0].clientY - translateY;
      } else if (e.touches.length === 2) {
        // Pinch to zoom à deux doigts
        isDragging = false;
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        initialPinchDistance = Math.hypot(dx, dy);
        initialScale = scale;
      }
    },
    { passive: true }
  );

  viewport.addEventListener(
    "touchmove",
    (e) => {
      if (e.touches.length === 1 && isDragging) {
        translateX = e.touches[0].clientX - startX;
        translateY = e.touches[0].clientY - startY;
        clampBounds();
        updateTransform();
      } else if (e.touches.length === 2 && initialPinchDistance) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const currentDistance = Math.hypot(dx, dy);

        const newScale = Math.min(
          Math.max((currentDistance / initialPinchDistance) * initialScale, minScale),
          maxScale
        );

        scale = newScale;
        clampBounds();
        updateTransform();
      }
    },
    { passive: true }
  );

  viewport.addEventListener("touchend", (e) => {
    if (e.touches.length === 0) {
      isDragging = false;
      initialPinchDistance = null;
    } else if (e.touches.length === 1) {
      // Reprendre le drag si un doigt reste posé
      isDragging = true;
      startX = e.touches[0].clientX - translateX;
      startY = e.touches[0].clientY - translateY;
    }
  });
});

