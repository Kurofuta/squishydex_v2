// ==========================================================================
// GESTION DES ONGLETS DE LA BOUTIQUE & SOUS-ONGLETS VILLAGE
// ==========================================================================

// 1. Onglets principaux de la boutique
const onglets = document.querySelectorAll('.onglets > .onglet');
const conteneurs = document.querySelectorAll('.contenu-boutique');

onglets.forEach(onglet => {
  onglet.addEventListener('click', () => {
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
// EFFET SONORE LORS DES ACHATS EN PIÈCES
// ==========================================
let sonPiece = new Audio('static/sounds/coin%20effect/pickupcoin.wav');
sonPiece.volume = 0.4;

// Sécurité pour compatibilité selon l'encodage du dossier (avec ou sans %20)
sonPiece.addEventListener('error', () => {
  sonPiece = new Audio('static/sounds/coin effect/pickupcoin.wav');
  sonPiece.volume = 0.4;
});

// On sélectionne tous les boutons d'achat qui utilisent des pièces (et PAS les vidéos)
const boutonsPieces = document.querySelectorAll('.bouton-achat:not(.btn-video)');

boutonsPieces.forEach(bouton => {
  bouton.addEventListener('click', () => {
    sonPiece.currentTime = 0;
    sonPiece.play().catch(err => console.warn("Lecture du son :", err));
  });
});


//=========================================
// EFFET SONORE CLIQUE BOUTON (Boutique & Aventure)
//=========================================
let sonBtn = new Audio('static/sounds/click%20sound/click%20sound%20btn.mp3');
sonBtn.volume = 0.4;

// Sécurité pour compatibilité selon l'encodage du dossier (avec ou sans %20)
sonBtn.addEventListener('error', () => {
  sonBtn = new Audio('static/sounds/click sound/click sound btn.mp3');
  sonBtn.volume = 0.4;
});

// Pour sélectionner DEUX boutons en même temps, on sépare leurs sélecteurs par une virgule !
const boutonsPrincipaux = document.querySelectorAll('#btn-ouvrir-boutique, #btn-ouvrir-popup, #btn-plus-pieces');

boutonsPrincipaux.forEach(bouton => {
  bouton.addEventListener('click', () => {
    sonBtn.currentTime = 0;
    sonBtn.play().catch(err => console.warn("Lecture du son bouton :", err));
  });
});