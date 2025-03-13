/**
 * switchModel
 */
import { MODEL_CONFIG, DESIGN_LIST, state } from "../global.js";
import { loadSVG } from './loadSVG.js';

// Init attributs data-model for each item of the list
export function initModelSwitcher() {
  const modelItems = document.querySelectorAll('.model-menu-filter .model-selection .item');
  const modelList = Object.keys(MODEL_CONFIG);
  
  modelItems.forEach((item, index) => {
    if (index < modelList.length) {
      item.setAttribute('data-model', modelList[index]);
      
      // Ajouter l'écouteur d'événement sur chaque élément
      item.addEventListener('click', handleModelChange);
    }
  });
  
  // Définir le modèle initial (s'assurer que state est importé correctement)
  if (state) {
      state.currentModel = "game";
  } else {
      console.error("Erreur: L'objet state n'est pas défini dans global.js ou n'est pas correctement importé.");
  }
  
  console.log("État initial du modèle:", state ? state.currentModel : "state non défini");
}

function updateBodyAttributesDetailed() {
  const currentModel = state.currentModel;
  const currentDesign = DESIGN_LIST[state.currentDesign];
  
  const body = document.body;
  
  // Attributs généraux
  body.setAttribute('data-model', currentModel);
  body.setAttribute('data-design', currentDesign);
  
  // Attributs détaillés pour différents ajustements
  switch(currentModel) {
    case 'game':
      body.setAttribute('data-model-height', '500');
      body.setAttribute('data-model-width', '500');
      body.setAttribute('data-svg-height', '399');
      body.setAttribute('data-svg-width', '196');
      break;
    case 'elite':
      body.setAttribute('data-model-height', '520');
      body.setAttribute('data-model-width', '510');
      body.setAttribute('data-svg-height', '405');
      body.setAttribute('data-svg-width', '200');
      break;
    case 'ligue':
      body.setAttribute('data-model-height', '490');
      body.setAttribute('data-model-width', '490');
      body.setAttribute('data-svg-height', '395');
      body.setAttribute('data-svg-width', '190');
      break;
    case 'pro':
      body.setAttribute('data-model-height', '510');
      body.setAttribute('data-model-width', '505');
      body.setAttribute('data-svg-height', '400');
      body.setAttribute('data-svg-width', '195');
      break;
  }
}

// function updateBackground(){
//     if (!state) {
//         console.error("Erreur: L'objet state n'est pas défini dans updateBackground");
//         return;
//     }

//     const background = document.querySelector('.banner');
//     const backgroundConfig = MODEL_CONFIG[state.];
// }

function updateShadow(){
    const shadow = document.querySelector('.model-shadow-container img');
    const shadowConfig = MODEL_CONFIG[state.currentModel];

    if (shadow && shadowConfig) {
        shadow.src = shadowConfig.shadowPath;
    }
}

// Update the model
function updateModel() {
    if (!state) {
        console.error("Erreur: L'objet state n'est pas défini dans updateModel");
        return;
    }

    const model = document.querySelector('.model');
    const modelConfig = MODEL_CONFIG[state.currentModel];
    
    if (model && modelConfig) {
      model.style.background = `url('${modelConfig.path}') ${modelConfig.bgPos}`;
      model.style.backgroundSize = 'contain';
      model.style.backgroundRepeat = 'no-repeat';
    }
}

// Update the shirt
function updateShirt() {
    if (!state) {
        console.error("Erreur: L'objet state n'est pas défini dans updateShirt");
        return;
    }

    const currentDesign = DESIGN_LIST[state.currentDesign];
    const modelConfig = MODEL_CONFIG[state.currentModel];
    
    if (currentDesign && modelConfig) {
        const svgPath = modelConfig.svgPath(currentDesign);
        console.log("Chargement du SVG:", svgPath);
        loadSVG(svgPath, 'model-shirt-svg-container');
    }
}

// Handler to change the model
function handleModelChange(event) {
    const selectedModel = event.currentTarget.getAttribute('data-model');

    if (!state) {
        console.error("Erreur: L'objet state n'est pas défini");
        return;
    }
    
    // Ne rien faire si c'est déjà le modèle actuel
    if (selectedModel === state.currentModel) {
      return;
    }

    console.log("Changement de modèle vers:", selectedModel);
    
    // Mettre à jour la classe active
    const modelItems = document.querySelectorAll('.model-menu-list li');
    modelItems.forEach(item => {
      item.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
    
    // Mettre à jour l'état
    state.currentModel = selectedModel;

    // Mettre à jour le fond si nécessaire
    
    // Mettre à jour le mannequin
    updateModel();
    
    // Mettre à jour le maillot pour le nouveau modèle
    updateShirt();

    // Mettre à jour l'ombre pour le nouveau modèle
    updateShadow();

    // Mettre à jour les attributs du body
    updateBodyAttributesDetailed();
}

export function updateShirtAfterDesignChange() {
    if (state) {
        updateShirt();
    } else {
        console.error("Erreur dans updateShirtAfterDesignChange: state n'est pas défini");
    }
}