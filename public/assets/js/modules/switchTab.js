/**
 * switchTab.js
 */

export function initTabNavigation(){
    const navItems = document.querySelectorAll('.nav-header .nav-item');
    const navRows = document.querySelectorAll('.nav-row');

    // Listener on each element
    navItems.forEach((item, index) => {
        item.addEventListener('click', () => {
          // Désactiver tous les onglets et toutes les rangées
          navItems.forEach(navItem => navItem.classList.remove('active'));
          navRows.forEach(row => row.classList.remove('active'));
          
          // Activer l'onglet cliqué et la rangée correspondante
          item.classList.add('active');
          if (navRows[index]) {
            navRows[index].classList.add('active');
          }
        });
    });
}