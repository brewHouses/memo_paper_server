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
var EventProxy = require('eventproxy');
const options = require('../config/options.js')
const util = require('../util/util.js')
const get_show_len = require('../util/get_show_len.js')


router.post('/', (req, res) => {
    // console.log(req.body);
    // Data.now().getTime().toString()
    var width = 400;
    var height = 25;
    var ep = new EventProxy();
    ep.after("gotline", 12, function (lines) {
      handle_bin_img(Buffer.concat(lines), req, res);
    });
    User.findOne({ paper_id: req.body.paper_id }).then(user => {
        if(user){
            MemoRecord.find({ email: user.email }, null, {sort:{date: -1}}).then(records => {
            //console.log(records)
            var img_data;
            for(let i=0; i<12; i++){

              //record = records[i].record

              if(i >= records.length)
                record = " "
              else
                record = records[i].record


              if(get_show_len(record) < 30){
                let tmp_len = 30 - get_show_len(record);
                while(tmp_len--)
                  record += " "
              }
              const svg = textToSVG.getSVG(record, options);
              const metrics = textToSVG.getMetrics(record, options)
                svg2img(svg, {'width':width, 'height':height} , function(error, buffer) {
                  //returns a Buffer
                  let img_name = 'part_img_'+i+'.png';

                  fs.writeFileSync(img_name, buffer);

                  fs.createReadStream(img_name).pipe(new PNG()).on('parsed', function() {
                    ep.emit('gotline', floydSteinberg(this).data);
                  })
              });
            }
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
