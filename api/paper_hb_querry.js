const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated, initAuthenticated } = require('../config/auth');
const User = require('../models/User');
const MemoRecord = require('../models/MemoRecord');
const handle_bin_img = require('../util/handle_bin_img.js');
const textToSVG = require('../config/font_file');
const PNG = require('pngjs').PNG;
var floydSteinberg = require('floyd-steinberg');
const svg2img = require('svg2img');
const fs = require('fs')
const options = require('../config/options')

router.post('/', (req, res) => {
    // console.log(req.body);
    // Data.now().getTime().toString()
    User.findOne({ paper_id: req.body.paper_id }).then(user => {
        if(user){
          MemoRecord.find({ email: user.email }, null, {sort:{date: -1}}).then(records => {
            console.log(records)
            record = records[0].record
            const svg = textToSVG.getSVG(record, options);
            svg2img(svg, {'width':400, 'height':300} , function(error, buffer) {
                //returns a Buffer
                fs.writeFileSync('foo2.png', buffer);
                fs.createReadStream('foo2.png').pipe(new PNG()).on('parsed', function() {
                  handle_bin_img(floydSteinberg(this).data, req, res);
                })
            });
          });
        }
        else{
          // C represent can't find the device
          res.end("C")
        }
    });
});


router.post('/get_last_time', (req, res) => {
    User.findOne({ paper_id: req.body.paper_id }).then(user => {
        if(user){
          res.end(user.date.getTime().toString())
        }
        else{
          // C represent can't find the device
          res.end("C")
        }
    });
});

module.exports = router;
