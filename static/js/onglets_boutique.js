// Sélection de tous les onglets et conteneurs d'objets
const onglets = document.querySelectorAll('.onglet');
const conteneurs = document.querySelectorAll('.contenu-boutique');

onglets.forEach(onglet => {
  onglet.addEventListener('click', () => {
    
    // 1. Retirer le style "actif" de tous les onglets
    onglets.forEach(o => o.classList.remove('actif'));
    
    // 2. Masquer totalement le contenu de toutes les catégories
    conteneurs.forEach(conteneur => conteneur.style.display = 'none');
    
    // 3. Appliquer le style "actif" uniquement sur l'onglet cliqué
    onglet.classList.add('actif');
    
    // 4. Récupérer le nom de la catégorie et afficher la bonne grille
    const categorieCible = onglet.getAttribute('data-categorie');
    document.getElementById(categorieCible).style.display = 'grid'; 
  });
});