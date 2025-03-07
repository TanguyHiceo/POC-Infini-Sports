import { initDefaultDesign, initDesignSwitcher } from "./modules/switchDesign.js";
import { buttonsListener, stylizeColorDividers, enableHorizontalScroll, shareButton } from './modules/buttonsListener.js';
// import { switchBackground } from './modules/switchBackground.js';
import { initModelSwitcher } from "./modules/switchModel.js";
import { exportSVGWithColors } from './modules/exportDesign.js';
import { initTabNavigation } from "./modules/switchTab.js";
import { toggleFilter } from "./modules/toggleFilter.js";
import { initDotNavigation } from "./modules/scrollTriggerSlider.js";
// import { triggerScrollColors } from "./modules/scrollTriggerSlider.js";

document.addEventListener('DOMContentLoaded', () => {
    initModelSwitcher();
    buttonsListener();
    shareButton();
    stylizeColorDividers();
    initDefaultDesign();
    initDesignSwitcher();
    initTabNavigation();
    enableHorizontalScroll();
    toggleFilter();
    initDotNavigation();
    // triggerScrollColors();
    // switchBackground();

    // Listener to download model
    document.querySelector('#export-button').addEventListener('click', exportSVGWithColors);
});