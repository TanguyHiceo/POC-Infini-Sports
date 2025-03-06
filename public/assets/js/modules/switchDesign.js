// /**
//  * Switch Design
//  */
import { DESIGN_START, DESIGN_LIST, state, MODEL_CONFIG } from '../global.js';
import { loadSVG } from './loadSVG.js';
import { updateShirtAfterDesignChange } from './switchModel.js';

// Common function to apply a design
function applyDesign(designIndex) {
  // Check if selected design is already selected
  if (designIndex === state.currentDesign) {
    return;
  }

  // Update current index
  state.currentDesign = designIndex;

  // Load corresponding design
  const currentModel = MODEL_CONFIG[state.currentModel];
  loadSVG(currentModel.svgPath(DESIGN_LIST[state.currentDesign]), 'model-shirt-svg-container');
  updateShirtAfterDesignChange();
}

// Init function for selection with previews
export function initDesignSwitcher() {
  const previewItems = document.querySelectorAll('.preview-model-item');

  previewItems.forEach(item => {
    item.addEventListener('click', () => {
      // Get name of the design with data-design attribute
      const designName = item.getAttribute('data-design');
      // Search index in DESIGN_LIST
      const designIndex = DESIGN_LIST.findIndex(el => el === designName);
      if (designIndex !== -1) {
        applyDesign(designIndex);
      }
    });
  });
}

// Init default index
export function initDefaultDesign() {
  let defaultIndex = DESIGN_LIST.findIndex(el => el === DESIGN_START);
  if (defaultIndex === -1) {
    defaultIndex = 0;
  }
  state.currentDesign = defaultIndex;
  
  const currentModel = MODEL_CONFIG[state.currentModel];
  loadSVG(currentModel.svgPath(DESIGN_LIST[state.currentDesign]), 'model-shirt-svg-container');
  updateShirtAfterDesignChange();
}
