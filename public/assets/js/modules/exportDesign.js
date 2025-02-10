/**
 * Export Design
 * & Convert SVG to JPG
 */

import { state } from "../global.js";
import { DESIGN_LIST } from "../global.js";

/**
 * Get actual CSS variables
 */
function getColorsMap() {
    const rootStyles = getComputedStyle(document.documentElement);
    return {
        '--clr-1': rootStyles.getPropertyValue('--clr-1').trim(),
        '--clr-1-light': rootStyles.getPropertyValue('--clr-1-light').trim(),
        '--clr-1-dark': rootStyles.getPropertyValue('--clr-1-dark').trim(),
        '--clr-2': rootStyles.getPropertyValue('--clr-2').trim(),
        '--clr-2-light': rootStyles.getPropertyValue('--clr-2-light').trim(),
        '--clr-2-dark': rootStyles.getPropertyValue('--clr-2-dark').trim(),
        '--clr-logo': rootStyles.getPropertyValue('--clr-logo').trim(),
    };
}

/**
 * Replace CSS variables in specific attribute of SVG element
 */
function replaceCSSVariables(element, attribute){
    if(element.hasAttribute(attribute)){
        let attrValue = element.getAttribute(attribute);
        Object.keys(colorsMap).forEach(varName => {
            const regex = new RegExp(`var\\(${varName}\\)`, 'g');
            attrValue = attrValue.replace(regex, colorsMap[varName]);
        });
        element.setAttribute(attribute, attrValue);
    }
}

/**
 * Replace CSS Variables in `style` attribute of SVG
 * (for `stop-color` in `<linearGradient>`)
 */
function replaceGradientVariables(element, colorsMap){
    if (element.hasAttribute("style")) {
        let styleValue = element.getAttribute("style");
        Object.keys(colorsMap).forEach(varName => {
            const regex = new RegExp(`var\\(${varName}\\)`, 'g');
            styleValue = styleValue.replace(regex, colorsMap[varName]);
        });
        element.setAttribute("style", styleValue);
    }
}

/**
 * Clean and replace CSS Variables in cloned SVG
 */
function cleanSVG(svgElement){
    const clonedSvg = svgElement.cloneNode(true);
    clonedSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");

    const colorsMap = getColorsMap();

    // Remplacement dans les attributs `fill`, `stroke`, `stop-color`
    clonedSvg.querySelectorAll('*').forEach(el => {
        replaceCSSVariables(el, 'fill', colorsMap);
        replaceCSSVariables(el, 'stroke', colorsMap);
        replaceCSSVariables(el, 'stop-color', colorsMap);
    });

    // Remplacement des couleurs dans les gradients `<linearGradient>` et `<stop>`
    clonedSvg.querySelectorAll('stop').forEach(stop => {
        replaceGradientVariables(stop, colorsMap);
    });

    // Remplacement dans la feuille de style interne au SVG
    const styleElement = clonedSvg.querySelector('style');
    if (styleElement) {
        let styleText = styleElement.textContent;
        Object.keys(colorsMap).forEach(varName => {
            const regex = new RegExp(`var\\(${varName}\\)`, 'g');
            styleText = styleText.replace(regex, colorsMap[varName]);
        });
        styleElement.textContent = styleText;
    }

    return clonedSvg;
}

/**
 * Add a logo watermark to the canvas
 */
function addLogoWatermark(canvas, ctx, logoSrc){
    const logo = new Image();
    logo.src = logoSrc;
    logo.crossOrigin = "anonymous"; // Important si le logo est en ligne

    logo.onload = function () {
        let scale = 0.3; // Réduction de la taille du logo
        let w = logo.width * scale;
        let h = logo.height * scale;
        let x = canvas.width - w - 20; // Position bas-droit
        let y = canvas.height - h - 20; 

        ctx.globalAlpha = 0.8; // Transparence du logo
        ctx.drawImage(logo, x, y, w, h);
        ctx.globalAlpha = 1.0; // Remet l'opacité normale
    };
}

/**
 * Convert SVG into JPG & Trigger download
 */
function convertSVGToJPG(svgElement, fileName) {
    // Convertir l'élément SVG en texte
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], { type: "image/svg+xml" });
    const svgUrl = URL.createObjectURL(svgBlob);

    // Création du canvas
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.crossOrigin = "anonymous"; // Permettre de charger l'image depuis une URL externe
    img.onload = function () {
        // Définir la taille du canvas en fonction du SVG
        canvas.width = img.width;
        canvas.height = img.height;

        // Dessiner l'image SVG sur le canvas
        ctx.drawImage(img, 0, 0);

        addLogoWatermark(canvas, ctx, "./public/assets/images/FR4183347-removebg.png");

        // Obtenir l'image JPG en Base64
        setTimeout(() => {
            const jpgUrl = canvas.toDataURL("image/jpeg", 1.0);

            // Télécharger le fichier JPG
            const a = document.createElement("a");
            a.href = jpgUrl;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            // Libérer l'URL pour éviter les fuites de mémoire
            URL.revokeObjectURL(svgUrl);
        }, 500);
    };

    img.src = svgUrl;
}

/**
 * Main function for export
 */
export function exportSVGWithColors(){
    const svgContainer = document.getElementById('woman-shirt-svg-container');
    if (!svgContainer) return;
    
    const svgElement = svgContainer.querySelector('svg');
    if (!svgElement) return;

    // Clean SVG & Replace colors
    const cleanedSVG = cleanSVG(svgElement);

    // Generate dynamic file name
    const modelName = DESIGN_LIST[state.currentDesign] || "Modèle";
    const colorNamePrimary = state.selectedPrimaryColor || "Marine";
    const colorNameSecondary = state.selectedSecondaryColor || "Rouge";
    const colorNameLogo = state.selectedLogoColor || "Blanc";
    const fileName = `${modelName}_(P-${colorNamePrimary})_(S-${colorNameSecondary})_(L-${colorNameLogo}).jpg`;

    // Convert in JPG & Download
    convertSVGToJPG(cleanedSVG, fileName);
}