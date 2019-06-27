const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated, initAuthenticated } = require('../config/auth');
const User = require('../models/User');

router.post('/', (req, res) => {
    console.log(req.body);
    // Data.now().getTime().toString()
    User.findOne({ paper_id: req.body.paper_id }).then(user => {
        if(user){
            if(req.body.update_time === "_"){
              //console.log(user.date.toString())
              res.end(String(user.date.getTime()))
            }
            if(req.body.update_time === user.date.getTime().toString())
              res.end('N')
            // in js, can compaer string with int number
            if(req.body.update_time < user.date.getTime())
              res.end('Y')
            if(req.body.update_time > user.date.getTime())
              res.end('W')
        }
        else{
          // N represent no update
          // C represent can't find the device
          res.end("C")
        }
    });
});

module.exports = router;
