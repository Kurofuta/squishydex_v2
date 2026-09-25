// ==========================================================================
// GESTION DES ONGLETS DE LA BOUTIQUE & SOUS-ONGLETS VILLAGE
// ==========================================================================

// 1. Onglets principaux de la boutique
const onglets = document.querySelectorAll('.onglets > .onglet');
const conteneurs = document.querySelectorAll('.contenu-boutique');

onglets.forEach(onglet => {
  onglet.addEventListener('click', () => {
    // Jouer le son d'onglet
    if (window.jouerSon) window.jouerSon('onglet');

    // Retirer l'état actif sur tous les onglets principaux
    onglets.forEach(o => o.classList.remove('actif'));
    // Masquer tous les conteneurs principaux
    conteneurs.forEach(conteneur => conteneur.style.display = 'none');

    // Activer l'onglet cliqué
    onglet.classList.add('actif');

    // Afficher la bonne section (flex pour le Village pour garder la barre au-dessus, grid pour les autres)
    const categorieCible = onglet.getAttribute('data-categorie');
    const cible = document.getElementById(categorieCible);
    if (cible) {
      cible.style.display = (categorieCible === 'village') ? 'flex' : 'grid';
    }
  });
});

// 2. Sous-onglets du Village (Maison, Enclos, Obstacles, Tours)
const sousOngletsVillage = document.querySelectorAll('.sous-onglet');
const sousContenusVillage = document.querySelectorAll('.sous-contenu');

sousOngletsVillage.forEach(sousOnglet => {
  sousOnglet.addEventListener('click', () => {
    // Jouer le son d'onglet
    if (window.jouerSon) window.jouerSon('onglet');

    // Retirer l'état actif sur tous les sous-onglets et sous-contenus
    sousOngletsVillage.forEach(so => so.classList.remove('actif'));
    sousContenusVillage.forEach(sc => sc.classList.remove('actif'));

    // Activer le sous-onglet cliqué
    sousOnglet.classList.add('actif');

    // Afficher la sous-grille correspondante
    const cibleId = sousOnglet.getAttribute('data-sous-cat');
    const sousCible = document.getElementById(cibleId);
    if (sousCible) {
      sousCible.classList.add('actif');
    }
  });
});

// Sélection du bouton vert "+"
const btnPlusPieces = document.getElementById('btn-plus-pieces');

if (btnPlusPieces) {
  btnPlusPieces.addEventListener('click', (e) => {
    e.preventDefault(); // Empêche le comportement de lien par défaut

    // 1. Ouvrir la popup boutique et le fond sombre
    const overlay = document.getElementById('overlay-sombre');
    const popupBoutique = document.getElementById('popup-boutique');
    if (overlay) overlay.classList.add('actif');
    if (popupBoutique) popupBoutique.classList.add('afficher');

    // 2. Simuler un clic sur l'onglet "Pièces"
    const ongletPieces = document.querySelector('.onglet[data-categorie="pieces"]');
    if (ongletPieces) {
      ongletPieces.click();
    }
  });
}

// ==========================================
// EFFETS SONORES DES BOUTONS DE LA BOUTIQUE
// ==========================================

// 1. Boutons d'achat en pièces (EXP, Village, Coffres)
const boutonsPieces = document.querySelectorAll('.bouton-achat:not(.btn-video)');
boutonsPieces.forEach(bouton => {
  bouton.addEventListener('click', () => {
    if (bouton.closest('#coffres')) {
      if (window.jouerSon) window.jouerSon('coffre');
    } else {
      if (window.jouerSon) window.jouerSon('piece');
    }
  });
});

// 2. Boutons de visionnage vidéo (Pièces & Nourriture)
const boutonsVideos = document.querySelectorAll('.bouton-achat.btn-video');
boutonsVideos.forEach(bouton => {
  bouton.addEventListener('click', () => {
    if (window.jouerSon) window.jouerSon('video');
  });
});

// 3. Boutons principaux de navigation (Boutique, Aventure, + pièces)
const boutonsPrincipaux = document.querySelectorAll('#btn-ouvrir-boutique, #btn-ouvrir-popup, #btn-plus-pieces');
boutonsPrincipaux.forEach(bouton => {
  bouton.addEventListener('click', () => {
    if (window.jouerSon) window.jouerSon('bouton');
  });
});