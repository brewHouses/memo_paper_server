const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated, initAuthenticated } = require('../config/auth');
const User = require('../models/User');

router.post('/', ensureAuthenticated, (req, res) => {
    User.findOne( { email: req.user.email }, function (err, record) {
    if(err){
      console.error(err);
      res.end("Failed");
    }else{
      res.end(JSON.stringify(record))
    }
  });
});

module.exports = router;
