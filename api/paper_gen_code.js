// TODO: keep a long session or stream for mulit-users
const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated, initAuthenticated } = require('../config/auth');
const User = require('../models/User');
const handle_bin_img = require('../util/handle_bin_img.js');
const textToSVG = require('../config/font_file');
const PNG = require('pngjs').PNG;
var floydSteinberg = require('floyd-steinberg');
const svg2img = require('svg2img');
const fs = require('fs')
const options = require('../config/options')

router.post('/', (req, res) => {
    console.log(req.body);
    var paper_id = req.body.paper_id;
    count = req.body.count

    // Search paper_id in db, if not find, then generate the image and encode
    User.findOne({ paper_id: paper_id }).then(user => {
    if (user) {
      // Find the item, and don't need to generate image
      res.end("Y");
    } else {
      if(count==='0')
        res.end("F");
      else{
        const svg = textToSVG.getSVG(paper_id, options);
        svg2img(svg, {'width':400, 'height':300} , function(error, buffer) {
            //returns a Buffer
            fs.writeFileSync('foo1.png', buffer);        
            fs.createReadStream('foo1.png').pipe(new PNG()).on('parsed', function() {
              handle_bin_img(floydSteinberg(this).data, req, res);
            })
        });
      }
    }
  });
})

module.exports = router;
