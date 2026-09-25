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

// ==========================================
// CODE POUR LA POPUP PROFIL
// ==========================================
const btnFermerProfil = document.getElementById('btn-fermer-profil');
const popupProfil = document.getElementById('popup-profil');
const avatarHeader = document.querySelector('.profil_joueur');

// Fermeture du profil
const fermerProfil = () => {
  if (overlayPopup) overlayPopup.classList.remove('actif');
  if (popupProfil) popupProfil.classList.remove('afficher');
};

if (btnFermerProfil) btnFermerProfil.addEventListener('click', fermerProfil);
if (overlayPopup) overlayPopup.addEventListener('click', fermerProfil);

// Permettre aussi d'ouvrir le profil en cliquant directement sur l'avatar du header
if (avatarHeader) {
  avatarHeader.style.cursor = 'pointer';
  avatarHeader.addEventListener('click', () => {
    if (overlayPopup) overlayPopup.classList.add('actif');
    if (popupProfil) popupProfil.classList.add('afficher');
  });
}

