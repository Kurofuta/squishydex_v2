// ==========================================================================
// GESTIONNAIRE AUDIO CENTRALISÉ - SQUISHYDEX
// ==========================================================================

const creerElementAudio = (chemin, volumeDefaut = 0.4, boucle = false) => {
  let audio = new Audio(encodeURI(chemin));
  audio.volume = volumeDefaut;
  audio.loop = boucle;

  // Sécurité repli au cas où le navigateur préfère le chemin brut sans encodage
  audio.addEventListener('error', () => {
    audio = new Audio(chemin);
    audio.volume = volumeDefaut;
    audio.loop = boucle;
  });

  return audio;
};

// 1. Dictionnaire de tous les sons du jeu
window.sonsJeu = {
  // Sons déjà en place
  piece: creerElementAudio('static/sounds/coin effect/pickupcoin.wav', 0.4),
  bouton: creerElementAudio('static/sounds/click sound/click sound btn.mp3', 0.4),

  // Nouveaux sons prévus (avec des noms simples)
  video: creerElementAudio('static/sounds/video.mp3', 0.4),
  onglet: creerElementAudio('static/sounds/onglet.mp3', 0.3),
  fermer: creerElementAudio('static/sounds/fermer.mp3', 0.35),
  coffre: creerElementAudio('static/sounds/coffre.mp3', 0.5),

  // Musique de fond (boucle infinie)
  musique: creerElementAudio('static/sounds/musique.mp3', 0.3, true)
};

// Rétrocompatibilité pour les scripts existants
window.sonPiece = window.sonsJeu.piece;
window.sonBtn = window.sonsJeu.bouton;

// 2. Fonction globale pour jouer un bruitage
window.jouerSon = (nomSon) => {
  // Vérifier si les bruitages sont activés dans les paramètres
  const sfxActif = localStorage.getItem('squishy_sfx_actif') !== 'false';
  if (!sfxActif && nomSon !== 'musique') return;

  const audio = window.sonsJeu ? window.sonsJeu[nomSon] : null;
  if (audio) {
    audio.currentTime = 0;
    // On capture silencieusement l'erreur si le fichier n'a pas encore été déposé
    audio.play().catch(() => {});
  }
};
