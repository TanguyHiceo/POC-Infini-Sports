/**
 * LoadSVG and inject the SVG into the DOM
 */
export async function loadSVG(svgPath, containerId) {
    try {
      // Charger le fichier SVG depuis le dossier public
      const response = await fetch(svgPath);
      const svgText = await response.text();
  
      // Insérer le SVG dans l'élément conteneur spécifié
      const container = document.getElementById(containerId);
      container.innerHTML = svgText;
  
      // Retourner l'élément SVG pour pouvoir le manipuler ensuite
      return container.querySelector('svg');
    } catch (error) {
      console.error('Erreur lors du chargement du SVG :', error);
    }
}