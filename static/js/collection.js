// ==========================================================================
// GESTIONNAIRE DE LA COLLECTION DE SQUISHYS (Filtres, Recherche, Tri & Favoris)
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  const popupCollection = document.getElementById('popup-collection');
  if (!popupCollection) return;

  const inputRecherche = document.getElementById('recherche-squishy');
  const selectTri = document.getElementById('tri-squishy');
  const boutonsRarete = document.querySelectorAll('#filtres-rarete .filtre-pill');
  const boutonsType = document.querySelectorAll('#filtres-type .filtre-pill');
  const grilleCollection = document.getElementById('grille-collection');
  const compteurTitre = document.getElementById('compteur-titre-collection');
  const texteCapacite = document.getElementById('texte-capacite-chiffres');
  const jaugeCapacite = document.getElementById('jauge-capacite');

  let filtreRareteActif = 'all';
  let filtreTypeActif = 'all';
  let rechercheTexte = '';

  // 1. Mise à jour des filtres et affichage des cartes
  function appliquerFiltres() {
    const cartes = grilleCollection.querySelectorAll('.carte-squishy');
    let squishiesVisibles = 0;
    let totalSquishies = 0;

    cartes.forEach(carte => {
      const isSlotLibre = carte.classList.contains('slot-libre');
      if (!isSlotLibre) totalSquishies++;

      const nom = (carte.getAttribute('data-nom') || '').toLowerCase();
      const rarete = carte.getAttribute('data-rarete') || '';
      const type = carte.getAttribute('data-type') || '';

      const matchRecherche = !rechercheTexte || nom.includes(rechercheTexte);
      const matchRarete = (filtreRareteActif === 'all') || (rarete === filtreRareteActif);
      const matchType = (filtreTypeActif === 'all') || (type === filtreTypeActif);

      // Si l'utilisateur filtre ou cherche, on masque les slots vides pour une meilleure lisibilité
      if (isSlotLibre) {
        if (filtreRareteActif !== 'all' || filtreTypeActif !== 'all' || rechercheTexte.length > 0) {
          carte.style.display = 'none';
        } else {
          carte.style.display = 'flex';
        }
      } else {
        if (matchRecherche && matchRarete && matchType) {
          carte.style.display = 'flex';
          squishiesVisibles++;
        } else {
          carte.style.display = 'none';
        }
      }
    });

    // Mettre à jour le compteur dans le titre si on filtre
    if (compteurTitre) {
      compteurTitre.textContent = squishiesVisibles;
    }
  }

  // 2. Écouteurs sur les boutons de filtre de rareté
  boutonsRarete.forEach(btn => {
    btn.addEventListener('click', () => {
      if (window.jouerSon) window.jouerSon('onglet');
      boutonsRarete.forEach(b => b.classList.remove('actif'));
      btn.classList.add('actif');
      filtreRareteActif = btn.getAttribute('data-rarete');
      appliquerFiltres();
    });
  });

  // 3. Écouteurs sur les boutons de filtre de type
  boutonsType.forEach(btn => {
    btn.addEventListener('click', () => {
      if (window.jouerSon) window.jouerSon('onglet');
      boutonsType.forEach(b => b.classList.remove('actif'));
      btn.classList.add('actif');
      filtreTypeActif = btn.getAttribute('data-type');
      appliquerFiltres();
    });
  });

  // 4. Recherche par nom en temps réel
  if (inputRecherche) {
    inputRecherche.addEventListener('input', (e) => {
      rechercheTexte = e.target.value.trim().toLowerCase();
      appliquerFiltres();
    });
  }

  // 5. Tri des cartes
  if (selectTri) {
    selectTri.addEventListener('change', () => {
      if (window.jouerSon) window.jouerSon('onglet');
      trierCartes(selectTri.value);
    });
  }

  function trierCartes(critere) {
    const cartes = Array.from(grilleCollection.querySelectorAll('.carte-squishy'));
    const cartesPossedees = cartes.filter(c => !c.classList.contains('slot-libre'));
    const cartesLibres = cartes.filter(c => c.classList.contains('slot-libre'));

    cartesPossedees.sort((a, b) => {
      if (critere === 'rarete-desc') {
        const valA = parseInt(a.getAttribute('data-rarete-val') || '0', 10);
        const valB = parseInt(b.getAttribute('data-rarete-val') || '0', 10);
        return valB - valA;
      } else if (critere === 'rarete-asc') {
        const valA = parseInt(a.getAttribute('data-rarete-val') || '0', 10);
        const valB = parseInt(b.getAttribute('data-rarete-val') || '0', 10);
        return valA - valB;
      } else if (critere === 'niveau-desc') {
        const nivA = parseInt(a.getAttribute('data-niveau') || '0', 10);
        const nivB = parseInt(b.getAttribute('data-niveau') || '0', 10);
        return nivB - nivA;
      } else if (critere === 'niveau-asc') {
        const nivA = parseInt(a.getAttribute('data-niveau') || '0', 10);
        const nivB = parseInt(b.getAttribute('data-niveau') || '0', 10);
        return nivA - nivB;
      } else if (critere === 'nom-asc') {
        const nomA = (a.getAttribute('data-nom') || '').toLowerCase();
        const nomB = (b.getAttribute('data-nom') || '').toLowerCase();
        return nomA.localeCompare(nomB);
      } else if (critere === 'favori') {
        const favA = parseInt(a.getAttribute('data-favori') || '0', 10);
        const favB = parseInt(b.getAttribute('data-favori') || '0', 10);
        return favB - favA;
      }
      return 0;
    });

    // Réinjecter dans le DOM ordonné (Squishies d'abord, puis slots libres)
    [...cartesPossedees, ...cartesLibres].forEach(carte => {
      grilleCollection.appendChild(carte);
    });
  }

  // 6. Gestion des boutons Favoris (❤️ / 🤍)
  grilleCollection.addEventListener('click', (e) => {
    const btnFav = e.target.closest('.btn-favori-squishy');
    if (!btnFav) return;

    e.stopPropagation();
    const carte = btnFav.closest('.carte-squishy');
    if (!carte) return;

    const estFavori = btnFav.classList.contains('actif');
    if (estFavori) {
      btnFav.classList.remove('actif');
      btnFav.textContent = '🤍';
      carte.setAttribute('data-favori', '0');
    } else {
      btnFav.classList.add('actif');
      btnFav.textContent = '❤️';
      carte.setAttribute('data-favori', '1');
      if (window.jouerSon) window.jouerSon('bouton');
    }
  });

  // Calcul initial
  appliquerFiltres();
});
