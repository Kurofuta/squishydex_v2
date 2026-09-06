const toggleBtn = document.getElementById('theme-toggle');

// Fonction pour mettre à jour l'icône du bouton
function updateToggleIcon() {
    const isDark = document.body.classList.contains('dark-theme');
    toggleBtn.textContent = isDark ? '☀️' : '🌙';
}

// Charger le thème sauvegardé au démarrage
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
}

// Initialiser la bonne icône au chargement de la page
updateToggleIcon();

// Basculer le thème et l'icône au clic
toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    updateToggleIcon();
});

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