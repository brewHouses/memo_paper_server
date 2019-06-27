const TextToSVG = require('text-to-svg');
const textToSVG = TextToSVG.loadSync(require('path').dirname(__filename)+"/../config/Mofita.otf");

module.exports = textToSVG
