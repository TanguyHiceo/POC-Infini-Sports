// import './style.css';

// const DESIGN_START = 'columba';
// const DESIGN_LIST = [
//   'aquarius',
//   'aquila',
//   'auriga',
//   'australe',
//   'centaurus',
//   'columba',
//   'corona',
//   'draco',
//   'gemini',
//   'hydra',
//   'leo',
//   'libra',
//   'mensa',
//   'norma',
//   'phoenix',
//   'vela',
//   'virgo',
// ];
// const COLOR_PALETTE = {
//   noir: '#000000',
//   blanc: '#FFFFFF',
//   gris: '#CCCCCC',
//   marine: '#001F5A',
//   jaune: '#f5e814',
//   turquoise: '#00b0c7',
//   petrole: '#00576e',
//   'vert-clair': '#8fd400',
//   'vert-prairie': '#3eae1f',
//   'orange-clair': '#f7a30a',
//   rose: '#ff9ec2',
//   rouge: '#e60d2e',
//   royal: '#0047ba',
//   'vert-foret': '#00824a',
//   'vert-lime': '#c9db03',
//   anthracite: '#424a52',
//   or: '#cfa04e',
//   'bleu-ciel': '#85c7e3',
//   bordeaux: '#8f1736',
//   orange: '#ed6e00',
// };
// const COLOR_PALETTE_LIGHT = {
//   noir: '#303030',
//   blanc: '#FFFFFF',
//   marine: '#012e85',
//   jaune: '#f9eb59',
//   turquoise: '#64d0df',
//   petrole: '#00a0ae',
//   'vert-clair': '#c6e866',
//   'vert-prairie': '#a4d781',
//   'orange-clair': '#fed268',
//   rose: '#f7cdd5',
//   rouge: '#fe4b72',
//   royal: '#0070cc',
//   'vert-foret': '#6fcb98',
//   'vert-lime': '#eeeb66',
//   anthracite: '#a5a9ac',
//   or: '#face00',
//   'bleu-ciel': '#abcb57',
//   bordeaux: '#d0003b',
//   orange: '#ffd5a0',
// };
// const COLOR_PALETTE_DARK = {
//   noir: '#000000',
//   blanc: '#FFFFFF',
//   marine: '#012e85',
//   jaune: '#f9eb59',
//   turquoise: '#0089aa',
//   petrole: '#07373f',
//   'vert-clair': '#83bc00',
//   'vert-prairie': '#008a0e',
//   'orange-clair': '#e47a00',
//   rose: '#fb4896',
//   rouge: '#af0f2a',
//   royal: '#06186f',
//   'vert-foret': '#0c6835',
//   'vert-lime': '#bbbf0c',
//   anthracite: '#1f242b',
//   or: '#ae8400',
//   'bleu-ciel': '#6bb2e5',
//   bordeaux: '#fb1f2d',
//   orange: '#bf4200',
// };

// let selectedPrimaryColor = "";
// let selectedSecondaryColor = "";
// let selectedLogoColor = "";

// /////////////////////// SWITCH DESIGN /////////////////////////////////

// const designSwitcher = document.getElementById('design-switcher');
// const designTitle = document.getElementById('design-title');
// designSwitcher.addEventListener('click', switchDesign);

// // Indices pour suivre le design actuel
// let currentDesign = DESIGN_LIST.findIndex((el) => el == DESIGN_START) - 1;

// function switchDesign() {
//   // Incrémenter l'indice des designs et revenir à 0 si on dépasse la longueur de la liste
//   currentDesign = (currentDesign + 1) % DESIGN_LIST.length;

//   // Afficher le titre
//   designTitle.innerHTML = DESIGN_LIST[currentDesign];

//   // Charger les nouveaux designs
//   loadSVG(`/woman/game-${DESIGN_LIST[currentDesign]}-woman.svg`, 'woman-shirt-svg-container');
//   // loadSVG(`/classic/game-${DESIGN_LIST[currentDesign]}.svg`, 'classic-shirt-svg-container');
// }
// switchDesign();

// // Fonction pour charger un SVG et l'injecter dans un élément DOM
// async function loadSVG(svgPath, containerId) {
//   try {
//     // Charger le fichier SVG depuis le dossier public
//     const response = await fetch(svgPath);
//     const svgText = await response.text();

//     // Insérer le SVG dans l'élément conteneur spécifié
//     const container = document.getElementById(containerId);
//     container.innerHTML = svgText;

//     // Retourner l'élément SVG pour pouvoir le manipuler ensuite
//     return container.querySelector('svg');
//   } catch (error) {
//     console.error('Erreur lors du chargement du SVG :', error);
//   }
// }

// function exportSVGWithColors() {
//   const svgContainer = document.getElementById('woman-shirt-svg-container');
//   const svgElement = svgContainer.querySelector('svg');

//   // Cloner l'élément SVG pour éviter de modifier l'original
//   const clonedSvg = svgElement.cloneNode(true);
//   clonedSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");

//   // Récupérer les valeurs des variables CSS actuelles
//   const rootStyles = getComputedStyle(document.documentElement);
//   const colorsMap = {
//       '--clr-1': rootStyles.getPropertyValue('--clr-1').trim(),
//       '--clr-1-light': rootStyles.getPropertyValue('--clr-1-light').trim(),
//       '--clr-1-dark': rootStyles.getPropertyValue('--clr-1-dark').trim(),
//       '--clr-2': rootStyles.getPropertyValue('--clr-2').trim(),
//       '--clr-2-light': rootStyles.getPropertyValue('--clr-2-light').trim(),
//       '--clr-2-dark': rootStyles.getPropertyValue('--clr-2-dark').trim(),
//       '--clr-logo': rootStyles.getPropertyValue('--clr-logo').trim(),
//   };

//   // Fonction pour remplacer les variables dans un attribut donné
//   function replaceCSSVariables(element, attribute){
//     if(element.hasAttribute(attribute)){
//       let attrValue = element.getAttribute(attribute);
//       Object.keys(colorsMap).forEach(varName => {
//           const regex = new RegExp(`var\\(${varName}\\)`, 'g');
//           attrValue = attrValue.replace(regex, colorsMap[varName]);
//       });
//       element.setAttribute(attribute, attrValue);
//     }
//   }

//   // Fonction pour remplacer les variables CSS dans l'attribut style (pour `stop-color`)
//   function replaceGradientVariables(element) {
//     if (element.hasAttribute("style")) {
//         let styleValue = element.getAttribute("style");
//         Object.keys(colorsMap).forEach(varName => {
//             const regex = new RegExp(`var\\(${varName}\\)`, 'g');
//             styleValue = styleValue.replace(regex, colorsMap[varName]);
//         });
//         element.setAttribute("style", styleValue);
//     }
//   }
  
//   // 1️⃣ Remplacement dans les attributs `fill`, `stroke`, `stop-color`
//   clonedSvg.querySelectorAll('*').forEach(el => {
//       replaceCSSVariables(el, 'fill');
//       replaceCSSVariables(el, 'stroke');
//       replaceCSSVariables(el, 'stop-color');
//   });

//   // 2️⃣ Remplacement dans les `<linearGradient>` et autres éléments `stop`
//   clonedSvg.querySelectorAll('stop').forEach(stop => {
//       replaceGradientVariables(stop);
//   });

//   // 3️⃣ Remplacement dans la feuille de style `<style>` interne au SVG
//   const styleElement = clonedSvg.querySelector('style');
//   if (styleElement) {
//       let styleText = styleElement.textContent;
//       Object.keys(colorsMap).forEach(varName => {
//           const regex = new RegExp(`var\\(${varName}\\)`, 'g');
//           styleText = styleText.replace(regex, colorsMap[varName]);
//       });
//       styleElement.textContent = styleText;
//   }

//   // Convertir l'élément SVG en texte
//   const svgData = new XMLSerializer().serializeToString(clonedSvg);
//   const svgBlob = new Blob([svgData], { type: "image/svg+xml" });
//   const svgUrl = URL.createObjectURL(svgBlob);

//   // Création du canvas pour la conversion PNG
//   const canvas = document.createElement("canvas");
//   const ctx = canvas.getContext("2d");

//   const img = new Image();
//   img.onload = function () {
//     // Définir la taille du canvas en fonction du SVG
//     canvas.width = img.width;
//     canvas.height = img.height;

//     // Dessiner l'image SVG sur le canvas
//     ctx.drawImage(img, 0, 0);

//     // Obtenir l'image PNG en Base64
//     const jpgUrl = canvas.toDataURL("image/jpeg", 1.0);

//   // Formatter le nom du fichier
//   const modelName = DESIGN_LIST[currentDesign];
//   let colorNamePrimary = selectedPrimaryColor.length > 0 ? selectedPrimaryColor : "Marine";
//   let colorNameSecondary = selectedSecondaryColor.length > 0 ? selectedSecondaryColor : "Rouge";
//   let colorNameLogo = selectedLogoColor.length > 0 ? selectedLogoColor : "Blanc";
//   const fileName = `${modelName}_(P-${colorNamePrimary})_(S-${colorNameSecondary})_(L-${colorNameLogo}).jpg`;

//     // Télécharger le fichier PNG
//     const a = document.createElement("a");
//     a.href = jpgUrl;
//     a.download = fileName;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);

//     // Libérer l'URL pour éviter les fuites de mémoire
//     URL.revokeObjectURL(svgUrl);
//   };

//   img.src = svgUrl;
// }

// // Ajouter l'événement sur le bouton d'exportation
// document.getElementById("export-svg-button").addEventListener("click", exportSVGWithColors);


// /////////////////////// CHANGE BACKGROUND ////////////////////////
// const backgroundSwitcherPrev = document.querySelector('.switch-background .switch-prev');
// const backgroundSwitcherNext = document.querySelector('.switch-background .switch-next');
// const background = document.querySelector('.banner');

// // Liste des backgrounds
// const BACKGROUND_LIST = [
//   { 
//     name: 'basket', 
//     path: '/BASKET.png' 
//   },
//   { 
//     name: 'rugby', 
//     path: '/rugby.png' 
//   },
// ];

// // Index pour suivre l'arrière plan actuel
// let currentBackgroundIndex = 0;

// backgroundSwitcherPrev.addEventListener('click', switchBackground);
// backgroundSwitcherNext.addEventListener('click', switchBackground);

// function switchBackground(e) {
//   // Si bouton précédent on décremente l'index sinon on incremente
//   if (e.currentTarget.classList.contains('switch-prev')) {
//     currentBackgroundIndex = (currentBackgroundIndex - 1 + BACKGROUND_LIST.length) % BACKGROUND_LIST.length;
//   } else {
//     currentBackgroundIndex = (currentBackgroundIndex + 1) % BACKGROUND_LIST.length;
//   }

//   // On récupère l’objet du background courant
//   const currentBg = BACKGROUND_LIST[currentBackgroundIndex];

//   // On applique le nouvel arrière-plan à la bannière
//   background.style.background = `url('${currentBg.path}') center/cover no-repeat`;
// }

// /////////////////// COLOR PICKERS ////////////////////////////

// // // Sélectionner les éléments HTML
// // const color1Picker = document.getElementById('color1');
// // const color2Picker = document.getElementById('color2');
// // const color1LightPicker = document.getElementById('color1-light');
// // const color1DarkPicker = document.getElementById('color1-dark');
// // const color2LightPicker = document.getElementById('color2-light');
// // const color2DarkPicker = document.getElementById('color2-dark');

// // // Fonction pour récupérer la valeur des custom properties
// // function getCSSVarValue(variable) {
// //   return getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
// // }

// // // Définir les valeurs par défaut des pickers
// // color1Picker.value = getCSSVarValue('--clr-1');
// // color2Picker.value = getCSSVarValue('--clr-2');
// // color1LightPicker.value = getCSSVarValue('--clr-1-light');
// // color1DarkPicker.value = getCSSVarValue('--clr-1-dark');
// // color2LightPicker.value = getCSSVarValue('--clr-2-light');
// // color2DarkPicker.value = getCSSVarValue('--clr-2-dark');

// // // Fonction pour mettre à jour les variables CSS
// // function updateColors() {
// //   const color1 = color1Picker.value;
// //   const color2 = color2Picker.value;
// //   const color1Light = color1LightPicker.value;
// //   const color1Dark = color1DarkPicker.value;
// //   const color2Light = color2LightPicker.value;
// //   const color2Dark = color2DarkPicker.value;

// //   // Mettre à jour les custom properties dans :root
// //   document.documentElement.style.setProperty('--clr-1', color1);
// //   document.documentElement.style.setProperty('--clr-2', color2);
// //   document.documentElement.style.setProperty('--clr-1-light', color1Light);
// //   document.documentElement.style.setProperty('--clr-1-dark', color1Dark);
// //   document.documentElement.style.setProperty('--clr-2-light', color2Light);
// //   document.documentElement.style.setProperty('--clr-2-dark', color2Dark);
// // }

// // // Écouter les changements sur les pickers de couleur
// // color1Picker.addEventListener('input', updateColors);
// // color1LightPicker.addEventListener('input', updateColors);
// // color1DarkPicker.addEventListener('input', updateColors);
// // color2Picker.addEventListener('input', updateColors);
// // color2LightPicker.addEventListener('input', updateColors);
// // color2DarkPicker.addEventListener('input', updateColors);

// /////////////////////// FIXED COLORS ////////////////////////

// let FixedColorsBtns = document.getElementsByClassName('fixed-color');

// for (let FixedColorsBtn of FixedColorsBtns) {
//   FixedColorsBtn.addEventListener('click', (e) => {
//     selectedPrimaryColor = e.currentTarget.dataset.primary;
//     selectedSecondaryColor = e.currentTarget.dataset.secondary;
//     selectedLogoColor = e.currentTarget.dataset.logo;

//     // Mettre à jour les custom properties dans :root
//     document.documentElement.style.setProperty('--clr-1', COLOR_PALETTE[selectedPrimaryColor]);
//     document.documentElement.style.setProperty('--clr-2', COLOR_PALETTE[selectedSecondaryColor]);
//     document.documentElement.style.setProperty('--clr-1-light', COLOR_PALETTE_LIGHT[selectedPrimaryColor]);
//     document.documentElement.style.setProperty('--clr-1-dark', COLOR_PALETTE_DARK[selectedPrimaryColor]);
//     document.documentElement.style.setProperty('--clr-2-light', COLOR_PALETTE_LIGHT[selectedSecondaryColor]);
//     document.documentElement.style.setProperty('--clr-2-dark', COLOR_PALETTE_DARK[selectedSecondaryColor]);
//     document.documentElement.style.setProperty('--clr-logo', COLOR_PALETTE[selectedLogoColor]);
//     console.log(COLOR_PALETTE[selectedLogoColor]);
//   });
// }
