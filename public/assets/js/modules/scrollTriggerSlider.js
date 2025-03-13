/**
 * scrollTriggerSlider.js
 */
export function initDotNavigation() {
  const swipeActions = document.querySelectorAll('.swipe-action');

  swipeActions.forEach(swipe => {
    // Search parent container for swipe-action
    const navRow = swipe.closest('.nav-row');
    if (!navRow) return;

    // Determine which container to be scroll
    let container = navRow.querySelector('.preview-model');
    if (!container) {
      container = navRow.querySelector('.color-palette-tooltip');
    }
    if (!container) return;

    // Select dots in the block
    const dots = swipe.querySelectorAll('.dot');
    if (dots.length < 3) return; // Min 3 dots

    // Update dots when we scroll
    container.addEventListener('scroll', () => {
      updateDots(container, dots);
    });
    updateDots(container, dots);

    // Click listener on each dots to scroll at the right position
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
 * Update display of dots depending on scroll percentage of the container
 *
 * @param {HTMLElement} container - Scrollable container
 * @param {NodeList} dots - List of dots to be updated
 */
function updateDots(container, dots) {
  const scrollLeft = container.scrollLeft;
  const maxScroll = container.scrollWidth - container.clientWidth;

  // If container not scrollable, then force to 0% (fix dot)
  let percentage = 0;
  if (maxScroll > 0) {
    percentage = (scrollLeft / maxScroll) * 100;
  }

  // Reset class for each dots
  dots.forEach(dot => dot.classList.remove('expand'));

  // Apply expand according to scroll position
  if (percentage < 25) {
    dots[0].classList.add('expand');
  } else if (percentage < 75) {
    dots[1].classList.add('expand');
  } else {
    dots[2].classList.add('expand');
  }
}
