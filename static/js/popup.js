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