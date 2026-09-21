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