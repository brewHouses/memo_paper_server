const TextToSVG = require('text-to-svg');
const textToSVG = TextToSVG.loadSync();
const fs = require('fs');
const svg2img = require('svg2img');
const btoa = require('btoa');
const PNG = require('pngjs').PNG;
const Jimp = require('jimp');

var ascii = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p']

function handle_bin_img(img, req, res){
    //img = img.bitmap.data;
    length = img.length
    var ret = ""
    temp_index = 1
    temp = 0
    for(let i=3; i < length; i+=4){
        if(img[i] == 0)
            temp += Math.pow(2, 3-(temp_index-1))
        if(temp_index % 4 == 0){
            temp_index = 1;
            ret += ascii[temp]
            temp = 0
            continue
        }
        temp_index++
    }
    console.log('ret')
    if(req.body.count == '1'){
      //console.log('a');
      res.end(ret.substring(0,15000));
    }
    if(req.body.count=='2') {
      //console.log('b');
      res.end(ret.substring(15000,30000));
    }
    return ret;
}

module.exports = handle_bin_img
