const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated, initAuthenticated } = require('../config/auth');
const MemoRecord = require('../models/MemoRecord');
const User = require('../models/User');

router.post('/', ensureAuthenticated, (req, res) => {
    MemoRecord.findById(req.body.id, function (err, record) {
    if(err){
        console.error(err);
        res.end("Failed");
    }else{
      User.findOne({ email: record.email }).then(user => {
        user.date = Date.now()
        user.save()
      });
      record.remove(function (err, r) {
        if(err){
            console.error(err);
            res.end("Failed");
        }else{
            //console.log(r);
        }
      })
      User.findOne({ email: record.email }).then(user => {
        console.log(user.date);
        user.date = Date.now()
        user.save()
      });
    }
  });
  res.end("OK");
});

module.exports = router;
