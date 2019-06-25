const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated, initAuthenticated } = require('../config/auth');
const MemoRecord = require('../models/MemoRecord');

router.post('/', ensureAuthenticated, (req, res) => {
    MemoRecord.findById(req.body.id, function (err, record) {
    if(err){
        console.error(err);
        res.end("Failed");
    }else{
      record.remove(function (err, r) {
        if(err){
            console.error(err);
            res.end("Failed");
        }else{
            //console.log(r);
        }
      })
    }
  });
  res.end("OK");
});

module.exports = router;
