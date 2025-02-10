import '../../../style.css';
import { switchDesign } from "./modules/switchDesign.js";
import { buttonsListener } from './modules/buttonsListener.js';
// import { switchBackground } from './modules/switchBackground.js';
import { exportSVGWithColors } from './modules/exportDesign.js';

document.addEventListener('DOMContentLoaded', () => {
    buttonsListener();
    switchDesign();
    // switchBackground();

    // Listener to download model
    document.querySelector('#export-button').addEventListener('click', exportSVGWithColors);
});