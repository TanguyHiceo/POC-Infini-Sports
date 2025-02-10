/**
 * SwitchBackground
 */
import { BACKGROUND_LIST } from "../global.js";

document.addEventListener("DOMContentLoaded", () => {
  const backgroundSwitcherPrev = document.querySelector('.switch-background .switch-prev');
  const backgroundSwitcherNext = document.querySelector('.switch-background .switch-next');
  const background = document.querySelector('.banner');

  // Index pour suivre l'arrière-plan actuel
  let currentBackgroundIndex = 0;

  // Vérifie que les boutons existent avant d'ajouter les événements
  if (backgroundSwitcherPrev && backgroundSwitcherNext && background) {
    backgroundSwitcherPrev.addEventListener('click', (e) => {
      currentBackgroundIndex = switchBackground(e, background, currentBackgroundIndex);
    });

    backgroundSwitcherNext.addEventListener('click', (e) => {
      currentBackgroundIndex = switchBackground(e, background, currentBackgroundIndex);
    });
  }
});

// Fonction pour changer l'arrière-plan
export function switchBackground(e, backgroundElement, currentBackgroundIndex) {
  if (!e || !backgroundElement) return currentBackgroundIndex;

  // Vérifie si le bouton est "Précédent" ou "Suivant"
  if (e.currentTarget.classList.contains('switch-prev')) {
    currentBackgroundIndex = (currentBackgroundIndex - 1 + BACKGROUND_LIST.length) % BACKGROUND_LIST.length;
  } else {
    currentBackgroundIndex = (currentBackgroundIndex + 1) % BACKGROUND_LIST.length;
  }

  // Récupère l’objet du background courant
  const currentBg = BACKGROUND_LIST[currentBackgroundIndex];

  // Applique le nouvel arrière-plan
  backgroundElement.style.background = `url('${currentBg.path}') center/cover no-repeat`;

  // Retourne le nouvel index pour qu'il soit mis à jour dans l'écouteur d'événement
  return currentBackgroundIndex;
}
