// On sélectionne nos acteurs
const btnOuvrirPopup = document.getElementById('btn-ouvrir-popup');
const btnFermerPopup = document.getElementById('btn-fermer-popup');
const overlayPopup = document.getElementById('overlay-sombre');
const popup = document.getElementById('ma-popup');

// Action d'ouverture
btnOuvrirPopup.addEventListener('click', () => {
  overlayPopup.classList.add('actif');
  popup.classList.add('afficher');
});

// Action de fermeture
const fermerPopup = () => {
  overlayPopup.classList.remove('actif');
  popup.classList.remove('afficher');
};

// On applique la fermeture sur la croix ET sur le fond sombre
btnFermerPopup.addEventListener('click', fermerPopup);
overlayPopup.addEventListener('click', fermerPopup);

// ==========================================
// CODE POUR LA POPUP BOUTIQUE
// ==========================================

// 1. On sélectionne les acteurs de la boutique avec leurs NOUVEAUX identifiants
const btnOuvrirBoutique = document.getElementById('btn-ouvrir-boutique');
const btnFermerBoutique = document.getElementById('btn-fermer-boutique');
const overlayBoutique = document.getElementById('overlay-sombre');
const popupBoutique = document.getElementById('popup-boutique');

// 2. Action d'ouverture de la boutique
btnOuvrirBoutique.addEventListener('click', () => {
  // On ajoute les mêmes classes "actif" et "afficher" que pour l'autre popup
  if(overlayBoutique) overlayBoutique.classList.add('actif');
  if(popupBoutique) popupBoutique.classList.add('afficher');
});

// 3. Action de fermeture de la boutique
const fermerBoutique = () => {
  if(overlayBoutique) overlayBoutique.classList.remove('actif');
  if(popupBoutique) popupBoutique.classList.remove('afficher');
};

// 4. On applique la fermeture sur la croix ET sur le fond sombre de la boutique
btnFermerBoutique.addEventListener('click', fermerBoutique);
if(overlayBoutique) overlayBoutique.addEventListener('click', fermerBoutique);

