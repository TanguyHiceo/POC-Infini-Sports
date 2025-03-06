/**
 * ToggleFilter.js
 */

export function toggleFilter(){
    const filterButton = document.querySelector('.model-filter');
    const filterMenu = document.querySelector(".model-menu-filter");
    const closeButton = filterMenu.querySelector('.close-icon');

    filterButton.addEventListener('click', () => {
        filterMenu.classList.toggle('open');
    });
    closeButton.addEventListener('click', () => {
        filterMenu.classList.toggle('open');
    });
}