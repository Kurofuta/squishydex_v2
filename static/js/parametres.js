// ==========================================================================
// GESTIONNAIRE DES PARAMÈTRES (AUDIO, THÈME, LANGUE & PRÉFÉRENCES)
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Éléments Audio
  const sliderSfx = document.getElementById('slider-sfx');
  const valeurSfx = document.getElementById('valeur-sfx');
  const toggleSfx = document.getElementById('toggle-sfx');

  const sliderMusique = document.getElementById('slider-musique');
  const valeurMusique = document.getElementById('valeur-musique');
  const toggleMusique = document.getElementById('toggle-musique');

  // 2. Éléments Thème & Langue
  const toggleTheme = document.getElementById('toggle-theme');
  const selectLangue = document.getElementById('select-langue');

  // --- FONCTION DE MISE À JOUR DE TOUS LES BRUITAGES (SFX) ---
  const appliquerVolumeSfx = (volumePourcent, actif = true) => {
    const vol = actif ? volumePourcent / 100 : 0;
    if (window.sonsJeu) {
      Object.keys(window.sonsJeu).forEach(cle => {
        if (cle !== 'musique' && window.sonsJeu[cle]) {
          window.sonsJeu[cle].volume = vol;
        }
      });
    }
  };

  // --- FONCTION DE MISE À JOUR DE LA MUSIQUE ---
  const appliquerVolumeMusique = (volumePourcent, actif = true) => {
    const vol = volumePourcent / 100;
    if (window.sonsJeu && window.sonsJeu.musique) {
      window.sonsJeu.musique.volume = vol;
      if (actif) {
        window.sonsJeu.musique.play().catch(() => {});
      } else {
        window.sonsJeu.musique.pause();
      }
    }
  };

  // --- GESTION DES BRUITAGES (SFX) ---
  if (sliderSfx && valeurSfx) {
    sliderSfx.addEventListener('input', () => {
      const val = parseInt(sliderSfx.value, 10);
      valeurSfx.textContent = `${val}%`;
      const isActif = toggleSfx ? toggleSfx.checked : true;
      appliquerVolumeSfx(val, isActif);
      localStorage.setItem('squishy_sfx_volume', val);
    });

    // Petit retour sonore quand on relâche le curseur pour tester le volume
    sliderSfx.addEventListener('change', () => {
      if (window.sonsJeu && window.sonsJeu.bouton && (!toggleSfx || toggleSfx.checked)) {
        window.sonsJeu.bouton.currentTime = 0;
        window.sonsJeu.bouton.play().catch(() => {});
      }
    });
  }

  if (toggleSfx) {
    toggleSfx.addEventListener('change', () => {
      const isActif = toggleSfx.checked;
      const val = sliderSfx ? parseInt(sliderSfx.value, 10) : 40;
      appliquerVolumeSfx(val, isActif);
      localStorage.setItem('squishy_sfx_actif', isActif);
    });
  }

  // --- GESTION DE LA MUSIQUE ---
  if (sliderMusique && valeurMusique) {
    sliderMusique.addEventListener('input', () => {
      const val = parseInt(sliderMusique.value, 10);
      valeurMusique.textContent = `${val}%`;
      const isActif = toggleMusique ? toggleMusique.checked : true;
      appliquerVolumeMusique(val, isActif);
      localStorage.setItem('squishy_musique_volume', val);
    });
  }

  if (toggleMusique) {
    toggleMusique.addEventListener('change', () => {
      const isActif = toggleMusique.checked;
      const val = sliderMusique ? parseInt(sliderMusique.value, 10) : 40;
      appliquerVolumeMusique(val, isActif);
      localStorage.setItem('squishy_musique_actif', isActif);
    });
  }

  // --- DÉMARRAGE DE LA MUSIQUE AU PREMIER CLIC (Politique des navigateurs) ---
  const lancerMusiquePremierClic = () => {
    const isActif = toggleMusique ? toggleMusique.checked : (localStorage.getItem('squishy_musique_actif') !== 'false');
    const val = sliderMusique ? parseInt(sliderMusique.value, 10) : 40;
    if (isActif) {
      appliquerVolumeMusique(val, true);
    }
  };
  document.addEventListener('click', lancerMusiquePremierClic, { once: true });

  // --- GESTION DU MODE SOMBRE / THÈME ---
  if (toggleTheme) {
    toggleTheme.addEventListener('change', () => {
      if (toggleTheme.checked) {
        document.body.classList.add('dark-theme');
        localStorage.setItem('squishy_theme', 'dark');
      } else {
        document.body.classList.remove('dark-theme');
        localStorage.setItem('squishy_theme', 'light');
      }
    });
  }

  // --- GESTION DE LA LANGUE ---
  if (selectLangue) {
    selectLangue.addEventListener('change', () => {
      localStorage.setItem('squishy_langue', selectLangue.value);
    });
  }

  // ==========================================================================
  // RESTAURATION DES PRÉFÉRENCES SAUVEGARDÉES (localStorage)
  // ==========================================================================

  // 1. Thème
  const savedTheme = localStorage.getItem('squishy_theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    if (toggleTheme) toggleTheme.checked = true;
  }

  // 2. Volume SFX
  const savedSfxVol = localStorage.getItem('squishy_sfx_volume');
  if (savedSfxVol !== null && sliderSfx && valeurSfx) {
    const vol = parseInt(savedSfxVol, 10);
    sliderSfx.value = vol;
    valeurSfx.textContent = `${vol}%`;
  }

  const savedSfxActif = localStorage.getItem('squishy_sfx_actif');
  if (savedSfxActif !== null && toggleSfx) {
    toggleSfx.checked = (savedSfxActif === 'true');
  }

  // Appliquer le volume initial aux sons
  const initialVol = sliderSfx ? parseInt(sliderSfx.value, 10) : 40;
  const initialActif = toggleSfx ? toggleSfx.checked : true;
  appliquerVolumeSfx(initialVol, initialActif);

  // 3. Volume Musique
  const savedMusiqueVol = localStorage.getItem('squishy_musique_volume');
  if (savedMusiqueVol !== null && sliderMusique && valeurMusique) {
    const volM = parseInt(savedMusiqueVol, 10);
    sliderMusique.value = volM;
    valeurMusique.textContent = `${volM}%`;
  }

  const savedMusiqueActif = localStorage.getItem('squishy_musique_actif');
  if (savedMusiqueActif !== null && toggleMusique) {
    toggleMusique.checked = (savedMusiqueActif === 'true');
  }

  // 4. Langue
  const savedLang = localStorage.getItem('squishy_langue');
  if (savedLang && selectLangue) {
    selectLangue.value = savedLang;
  }
});
