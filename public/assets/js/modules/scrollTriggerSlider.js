// /**
//  * scrollTriggerSlider.js
//  */
// export function triggerScrollColors(){
//     const swipeActions = document.querySelectorAll('.swipe-action');

//     swipeActions.forEach(swipeAction => {
//         let container;
    
//         // If swipeAction is in a line who contain .preview-model, then it's for the slider of design
//         const navRowFlex = swipeAction.closest('.nav-row.flex');
//         if (navRowFlex) {
//           container = navRowFlex.querySelector('.preview-model');
//         }
//         // Else if swipeAction is in a line who contain .preview-color, then it's for the color palette
//         else {
//           const previewColor = swipeAction.closest('.preview-color');
//           if (previewColor) {
//             container = previewColor.querySelector('.color-palette-tooltip');
//           }
//         }
    
//         if (container) {
//           const nextButton = swipeAction.querySelector('.preview-next-btn');
//           const prevButton = swipeAction.querySelector('.preview-prev-btn');
    
//           nextButton.addEventListener('click', () => {
//             handleScroll(container, 1);
//           });
//           prevButton.addEventListener('click', () => {
//             handleScroll(container, -1);
//           });
//         }
//     });
// }

// /**
//  * Allow to scroll the container in a specific direction
//  * @param {HTMLElement} container - The container to be scrolled
//  * @param {number} direction - [1] to move forward and [-1] to move back 
//  */
// function handleScroll(container, direction) {
//     // Each item have a width of 48px and a spacing of 16px
//     const itemWidthTotal = 48 + 16;
//     container.scrollLeft += direction * itemWidthTotal;
// }
export function initDotNavigation() {
  const swipeActions = document.querySelectorAll('.swipe-action');

  swipeActions.forEach(swipe => {
    // Recherche le conteneur parent pour la swipe-action
    const navRow = swipe.closest('.nav-row');
    if (!navRow) return;

    // Détermine le conteneur à faire défiler
    let container = navRow.querySelector('.preview-model');
    if (!container) {
      container = navRow.querySelector('.color-palette-tooltip');
    }
    if (!container) return;

    // Sélectionne les dots dans ce bloc
    const dots = swipe.querySelectorAll('.dot');
    if (dots.length < 3) return; // Au moins 3 dots attendus

    // Met à jour les dots au scroll du conteneur
    container.addEventListener('scroll', () => {
      updateDots(container, dots);
    });
    updateDots(container, dots); // appel initial

    // Ajoute un clic sur chaque dot pour défiler vers la position correspondante
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        const maxScroll = container.scrollWidth - container.clientWidth;
        let targetScroll = 0;
        if (index === 1) {
          targetScroll = maxScroll * 0.5;
        } else if (index === 2) {
          targetScroll = maxScroll;
        }
        container.scrollTo({
          left: targetScroll,
          behavior: 'smooth'
        });
      });
    });
  });
}

/**
 * Met à jour l'affichage des dots en fonction du pourcentage de scroll du conteneur.
 *
 * @param {HTMLElement} container - Le conteneur défilable.
 * @param {NodeList} dots - La liste des dots à mettre à jour.
 */
function updateDots(container, dots) {
  const scrollLeft = container.scrollLeft;
  const maxScroll = container.scrollWidth - container.clientWidth;

  // Si le conteneur n'est pas scrollable, forcer à 0%
  let percentage = 0;
  if (maxScroll > 0) {
    percentage = (scrollLeft / maxScroll) * 100;
  }

  // Réinitialise la classe pour tous les dots
  dots.forEach(dot => dot.classList.remove('expand'));

  // Applique "expand" selon la position de scroll
  if (percentage < 25) {
    dots[0].classList.add('expand');
  } else if (percentage < 75) {
    dots[1].classList.add('expand');
  } else {
    dots[2].classList.add('expand');
  }
}
