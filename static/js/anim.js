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