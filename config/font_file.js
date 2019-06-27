const TextToSVG = require('text-to-svg');
const textToSVG = TextToSVG.loadSync(require('path').dirname(__filename)+"/../config/C301.ttf");
//const textToSVG = TextToSVG.loadSync();

module.exports = textToSVG
