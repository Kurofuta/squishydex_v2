// ------------------------------SideBar------------------------------

// On sélectionne les éléments HTML
const sidebar = document.getElementById('menu-lateral');
const btnOuvrir = document.getElementById('btn-ouvrir');
const btnFermer = document.getElementById('btn-fermer');
const overlay = document.getElementById('overlay-sombre');

// Fonction pour ouvrir le menu
btnOuvrir.addEventListener('click', () => {
  sidebar.classList.add('ouverte');
  overlay.classList.add('actif');
});

// Fonction pour fermer le menu (via le bouton ou en cliquant sur l'overlay sombre)
const fermerMenu = () => {
  sidebar.classList.remove('ouverte');
  overlay.classList.remove('actif');
};

btnFermer.addEventListener('click', fermerMenu);
overlay.addEventListener('click', fermerMenu);