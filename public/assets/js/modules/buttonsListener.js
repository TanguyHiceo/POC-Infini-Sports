/**
 * ButtonsListener
 */
import { COLOR_PALETTE, COLOR_PALETTE_LIGHT, COLOR_PALETTE_DARK, state } from "../global.js";

export function buttonsListener(){
  // Change colors
  let FixedColorsBtns = document.querySelectorAll('.fixed-color');

  for (let FixedColorsBtn of FixedColorsBtns) {
    FixedColorsBtn.addEventListener('click', (e) => {
      const { primary, secondary, tertiary, logo } = e.currentTarget.dataset;

      // Update global state
      state.selectedPrimaryColor = primary;
      state.selectedSecondaryColor = secondary;
      state.selectedTertiaryColor = tertiary || "";
      state.selectedLogoColor = logo;
  
      // Mapping on colors in css properties
      const colorMapping = {
        '--clr-1': COLOR_PALETTE[primary],
        '--clr-2': COLOR_PALETTE[secondary],
        '--clr-1-light': COLOR_PALETTE_LIGHT[primary],
        '--clr-1-dark': COLOR_PALETTE_DARK[primary],
        '--clr-2-light': COLOR_PALETTE_LIGHT[secondary],
        '--clr-2-dark': COLOR_PALETTE_DARK[secondary],
        '--clr-3': COLOR_PALETTE[tertiary],
        '--clr-logo': COLOR_PALETTE[logo],
      };

      // Applied colors
      Object.entries(colorMapping).forEach(([key, value]) => {
        document.documentElement.style.setProperty(key, value || "");
      });

      // Remove active class for each buttons
      document.querySelectorAll('.fixed-color').forEach(btn => {
        btn.classList.remove('active');
      });

      // Add class to the button
      e.currentTarget.classList.toggle('active');
    });
  }
}

export function stylizeColorDividers(){
  // Select all buttons
  const colorButtons = document.querySelectorAll('.fixed-color');

  colorButtons.forEach(button => {
    // Get data attributes
    const primaryColor = button.getAttribute('data-primary');
    const secondaryColor = button.getAttribute('data-secondary');

    // Get dividers inside the button
    const dividers = button.querySelectorAll('.divider');

    // Apply color if they exist in the COLOR PALETTE
    if(dividers.length >= 1 && COLOR_PALETTE[primaryColor]){
      dividers[0].style.backgroundColor = COLOR_PALETTE[primaryColor];
    }

    if(dividers.length >= 2 && COLOR_PALETTE[secondaryColor]){
      dividers[1].style.backgroundColor = COLOR_PALETTE[secondaryColor];
    }

    if(primaryColor === "blanc" || secondaryColor === "blanc"){
      button.style.border = "1px solid #1F2C4F";
    }
  });
}

// On Models
export function enableHorizontalScroll() {
  const container = document.querySelector('.preview-model'); // Ton conteneur défilant
  
  if (!container) return;
  
  container.addEventListener('wheel', (e) => {
    // Empêche le défilement vertical par défaut
    e.preventDefault();
    
    // Déplace horizontalement au lieu de verticalement
    // Le multiplicateur (40) contrôle la vitesse de défilement
    container.scrollLeft += e.deltaY * 2;
  }, { passive: false }); // passive: false est nécessaire pour que preventDefault fonctionne
}

export function shareButton(){
  // Can put some data, not compatible with Firefox
  // (https://developer.mozilla.org/fr/docs/Web/API/Navigator/share)
  const shareData = {
    title: 'Mon site',
    text: 'Découvrez ce contenu',
    url: window.location.href,
  };

  const shareBtn = document.querySelector('#share-button');
  shareBtn.addEventListener('click', async () => {
    try{
      await navigator.share(shareData);
    } catch(err){
      console.error('Errror');
    }
  })
}