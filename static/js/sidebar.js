// ------------------------------SideBar------------------------------

// On sélectionne les éléments HTML
const sidebar = document.getElementById('menu-lateral');
const btnOuvrir = document.getElementById('btn-ouvrir');
const btnFermer = document.getElementById('btn-fermer');
const overlay = document.getElementById('overlay-sombre');

// Fonction pour ouvrir le menu
btnOuvrir.addEventListener('click', () => {
  if (window.jouerSon) window.jouerSon('bouton');
  sidebar.classList.add('ouverte');
  overlay.classList.add('actif');
});

// Fonction pour fermer le menu (via le bouton ou en cliquant sur l'overlay sombre)
const fermerMenu = () => {
  if (window.jouerSon) window.jouerSon('fermer');
  sidebar.classList.remove('ouverte');
  overlay.classList.remove('actif');
};

btnFermer.addEventListener('click', fermerMenu);
overlay.addEventListener('click', fermerMenu);

// Sélection du lien "Boutique" dans le menu de l'engrenage
const lienSidebarBoutique = document.getElementById('lien-sidebar-boutique') || document.getElementById('lien_sidebar_boutique');

if (lienSidebarBoutique) {
  lienSidebarBoutique.addEventListener('click', (e) => {
    e.preventDefault();

    // 1. Fermer le menu latéral
    const sidebar = document.getElementById('menu-lateral');
    if (sidebar) sidebar.classList.remove('ouverte');

    // 2. Ouvrir la popup boutique (le fond sombre reste actif)
    const overlay = document.getElementById('overlay-sombre');
    const popupBoutique = document.getElementById('popup-boutique');
    if (overlay) overlay.classList.add('actif');
    if (popupBoutique) popupBoutique.classList.add('afficher');

    // (Optionnel) Si tu veux toujours réinitialiser sur le premier onglet "Coffres" :
    // const ongletCoffres = document.querySelector('.onglet[data-categorie="coffres"]');
    // if (ongletCoffres) ongletCoffres.click();
  });
}

// Sélection du lien "Aventures" dans le menu latéral
const lienSidebarAventure = document.getElementById('lien-sidebar-aventure') || document.getElementById('lien_sidebar_aventure');

if (lienSidebarAventure) {
  lienSidebarAventure.addEventListener('click', (e) => {
    e.preventDefault();

    // 1. Fermer le menu latéral
    const sidebar = document.getElementById('menu-lateral');
    if (sidebar) sidebar.classList.remove('ouverte');

    // 2. Ouvrir la popup aventure (id="ma-popup") et activer le fond sombre
    const overlay = document.getElementById('overlay-sombre');
    const popupAventure = document.getElementById('ma-popup');
    if (overlay) overlay.classList.add('actif');
    if (popupAventure) popupAventure.classList.add('afficher');
  });
}

// Sélection du lien "Profil" dans le menu latéral (engrenage)
const lienSidebarProfil = document.getElementById('lien-sidebar-profil') || document.getElementById('lien_sidebar_profil');

if (lienSidebarProfil) {
  lienSidebarProfil.addEventListener('click', (e) => {
    e.preventDefault();

    // 1. Fermer le menu latéral
    const sidebar = document.getElementById('menu-lateral');
    if (sidebar) sidebar.classList.remove('ouverte');

    // 2. Ouvrir la popup profil et activer le fond sombre
    const overlay = document.getElementById('overlay-sombre');
    const popupProfil = document.getElementById('popup-profil');
    if (overlay) overlay.classList.add('actif');
    if (popupProfil) popupProfil.classList.add('afficher');
  });
}

// Sélection du lien "Paramètres" dans le menu latéral (engrenage)
const lienSidebarParametres = document.getElementById('lien-sidebar-parametres') || document.getElementById('lien_sidebar_parametres');

if (lienSidebarParametres) {
  lienSidebarParametres.addEventListener('click', (e) => {
    e.preventDefault();

    // 1. Fermer le menu latéral
    const sidebar = document.getElementById('menu-lateral');
    if (sidebar) sidebar.classList.remove('ouverte');

    // 2. Ouvrir la popup paramètres et activer le fond sombre
    const overlay = document.getElementById('overlay-sombre');
    const popupParametres = document.getElementById('popup-parametres');
    if (overlay) overlay.classList.add('actif');
    if (popupParametres) popupParametres.classList.add('afficher');
  });
}