/**
 * ButtonsListener
 */
import { COLOR_PALETTE, COLOR_PALETTE_LIGHT, COLOR_PALETTE_DARK, state } from "../global.js";

export function buttonsListener(){
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
    });
  }
}