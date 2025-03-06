/**
 * Switch Design
 */
import { DESIGN_START, DESIGN_LIST, state, MODEL_CONFIG } from '../global.js';
import { loadSVG } from './loadSVG.js';
import { updateShirtAfterDesignChange } from './switchModel.js';

const designSwitcher = document.querySelector('#design-switcher');
const designTitle = document.querySelector('#design-title');
designSwitcher.addEventListener('click', switchDesign);

// Indices pour suivre le design actuel
state.currentDesign = DESIGN_LIST.findIndex((el) => el == DESIGN_START) - 1;

export function switchDesign() {
  // Incrémenter l'indice des designs et revenir à 0 si on dépasse la longueur de la liste
  state.currentDesign = (state.currentDesign + 1) % DESIGN_LIST.length;

  // Afficher le titre
  designTitle.innerHTML = DESIGN_LIST[state.currentDesign];

  // Charger les nouveaux designs selon le modèle
  const currentModel = MODEL_CONFIG[state.currentModel]
  // loadSVG(`./public/woman/game-${DESIGN_LIST[state.currentDesign]}-woman.svg`, 'model-shirt-svg-container');
  loadSVG(currentModel.svgPath(DESIGN_LIST[state.currentDesign]), 'model-shirt-svg-container');
  // loadSVG(`/classic/game-${DESIGN_LIST[state.currentDesign]}.svg`, 'classic-shirt-svg-container');

  updateShirtAfterDesignChange();
}
