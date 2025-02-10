/**
 * GLOBAL JS
 */
// FIRST DESIGN SHOW
const DESIGN_START = 'columba';

// LIST DESIGN
const DESIGN_LIST = [
  'aquarius',
  'aquila',
  'auriga',
  'australe',
  'centaurus',
  'columba',
  'corona',
  'draco',
  'gemini',
  'hydra',
  'leo',
  'libra',
  'mensa',
  'norma',
  'phoenix',
  'vela',
  'virgo',
];

// COLORS
const COLOR_PALETTE = {
  noir: '#000000',
  blanc: '#FFFFFF',
  // 'blanc-casser': '#e8e8e8',
  'blanc-casser': '#8f1736',
  gris: '#CCCCCC',
  marine: '#001F5A',
  jaune: '#f5e814',
  turquoise: '#00b0c7',
  petrole: '#00576e',
  'vert-clair': '#8fd400',
  'vert-prairie': '#3eae1f',
  'orange-clair': '#f7a30a',
  rose: '#ff9ec2',
  rouge: '#e60d2e',
  royal: '#0047ba',
  'vert-foret': '#00824a',
  'vert-lime': '#c9db03',
  anthracite: '#424a52',
  or: '#cfa04e',
  'bleu-ciel': '#85c7e3',
  bordeaux: '#8f1736',
  orange: '#ed6e00',
};

// COLORS LIGHT
const COLOR_PALETTE_LIGHT = {
  noir: '#303030',
  blanc: '#FFFFFF',
  marine: '#012e85',
  jaune: '#f9eb59',
  turquoise: '#64d0df',
  petrole: '#00a0ae',
  'vert-clair': '#c6e866',
  'vert-prairie': '#a4d781',
  'orange-clair': '#fed268',
  rose: '#f7cdd5',
  rouge: '#fe4b72',
  royal: '#0070cc',
  'vert-foret': '#6fcb98',
  'vert-lime': '#eeeb66',
  anthracite: '#a5a9ac',
  or: '#face00',
  'bleu-ciel': '#abcb57',
  bordeaux: '#d0003b',
  orange: '#ffd5a0',
};

// COLORS DARK
const COLOR_PALETTE_DARK = {
  noir: '#000000',
  blanc: '#FFFFFF',
  marine: '#012e85',
  jaune: '#f9eb59',
  turquoise: '#0089aa',
  petrole: '#07373f',
  'vert-clair': '#83bc00',
  'vert-prairie': '#008a0e',
  'orange-clair': '#e47a00',
  rose: '#fb4896',
  rouge: '#af0f2a',
  royal: '#06186f',
  'vert-foret': '#0c6835',
  'vert-lime': '#bbbf0c',
  anthracite: '#1f242b',
  or: '#ae8400',
  'bleu-ciel': '#6bb2e5',
  bordeaux: '#fb1f2d',
  orange: '#bf4200',
};

// BACKGROUND LIST
const BACKGROUND_LIST = [
    { 
      name: 'basket', 
      path: '/BASKET.png' 
    },
    { 
      name: 'rugby', 
      path: '/rugby.png' 
    },
];

// Object contain all dynamic properties
const state = {
  currentDesign: 0,
  selectedPrimaryColor: "",
  selectedSecondaryColor: "",
  selectedTertiaryColor: "",
  selectedLogoColor: ""
};

/**
 * EXPORT CONST
 */
export { 
    DESIGN_START, 
    DESIGN_LIST, 
    COLOR_PALETTE, 
    COLOR_PALETTE_LIGHT, 
    COLOR_PALETTE_DARK, 
    BACKGROUND_LIST,
    state,
};