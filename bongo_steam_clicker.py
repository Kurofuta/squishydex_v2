"""
🐾 AUTO-TAPPER BONGO CAT STEAM (Spécial succès / Coffres)
Utilise les touches fantômes F23 et F24 :
- Bongo Cat compte les tapes à fond (les 2 pattes alternent !)
- AUCUNE lettre ne s'écrit sur ton écran (pas de texte gênant)
- Tu peux continuer à utiliser ton PC en même temps en toute liberté !
"""
import sys
import ctypes
import time

# Forcer l'affichage immédiat dans le terminal VS Code
try:
    sys.stdout.reconfigure(line_buffering=True)
except Exception:
    pass

user32 = ctypes.windll.user32

# Touches de contrôle (F6 ou F8 pour Démarrer / Pause)
VK_F6 = 0x75
VK_F8 = 0x77

# Touches fantômes reconnues par Windows et Bongo Cat,
# mais qui n'écrivent aucun texte dans les applications !
VK_F23 = 0x86  # Patte gauche
VK_F24 = 0x87  # Patte droite

KEYEVENTF_KEYUP = 0x0002

def est_touche_pressee(vk):
    return (user32.GetAsyncKeyState(vk) & 0x8000) != 0

def envoyer_tap_fantome(vk):
    # Appui de la touche
    user32.keybd_event(vk, 0, 0, 0)
    time.sleep(0.003)
    # Relâche de la touche
    user32.keybd_event(vk, 0, KEYEVENTF_KEYUP, 0)

print("\n" + "="*50, flush=True)
print("🐾 AUTO-TAPPER BONGO CAT STEAM (F23 / F24)", flush=True)
print("="*50, flush=True)
print("👉 Appuie sur [ F6 ] ou [ F8 ] pour DÉMARRER / ARRÊTER", flush=True)
print("👉 (Si PC portable : pense à Fn + F6 ou Fn + F8)", flush=True)
print("✨ Grâce aux touches fantômes :", flush=True)
print("   • Les clics augmentent à fond dans Bongo Cat !", flush=True)
print("   • AUCUNE lettre ne s'écrit sur ton écran !", flush=True)
print("   • Tu peux utiliser ton PC normalement en même temps !", flush=True)
print("="*50 + "\n", flush=True)

actif = False
total_clics = 0

try:
    while True:
        # Détection de la touche d'activation F6 ou F8
        if est_touche_pressee(VK_F6) or est_touche_pressee(VK_F8):
            actif = not actif
            if actif:
                print("\n▶️ [DÉMARRÉ] Les pattes de Bongo Cat tapent à fond !", flush=True)
            else:
                print(f"\n⏸️ [PAUSE] Arrêté. Total taps envoyés : {total_clics:,}\n", flush=True)
            
            # Anti-rebond : attend que la touche soit relâchée
            while est_touche_pressee(VK_F6) or est_touche_pressee(VK_F8):
                time.sleep(0.05)
            time.sleep(0.1)

        if actif:
            # Alterne entre patte gauche (F23) et patte droite (F24)
            touche = VK_F24 if (total_clics % 2 == 0) else VK_F23
            envoyer_tap_fantome(touche)
            
            total_clics += 1
            if total_clics % 20 == 0:
                sys.stdout.write(f"\r🐾 Taps comptabilisés : {total_clics:,} | Statut : ACTIF")
                sys.stdout.flush()

            time.sleep(0.02)  # ~40 taps par seconde
        else:
            time.sleep(0.03)

except KeyboardInterrupt:
    print(f"\n👋 Script fermé. Total final : {total_clics:,}")
