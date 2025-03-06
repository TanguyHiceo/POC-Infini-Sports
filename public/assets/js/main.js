import { switchDesign } from "./modules/switchDesign.js";
import { buttonsListener, stylizeColorDividers, enableHorizontalScroll } from './modules/buttonsListener.js';
// import { switchBackground } from './modules/switchBackground.js';
import { initModelSwitcher } from "./modules/switchModel.js";
import { exportSVGWithColors } from './modules/exportDesign.js';
import { initTabNavigation } from "./modules/switchTab.js";
import { toggleFilter } from "./modules/toggleFilter.js";

document.addEventListener('DOMContentLoaded', () => {
    initModelSwitcher();
    buttonsListener();
    stylizeColorDividers();
    switchDesign();
    initTabNavigation();
    enableHorizontalScroll();
    toggleFilter();
    // switchBackground();

    // Listener to download model
    document.querySelector('#export-button').addEventListener('click', exportSVGWithColors);
});