const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated, initAuthenticated } = require('../config/auth');
const User = require('../models/User');

router.post('/', (req, res) => {
    console.log(req.body);
    // Data.now().toString()
    User.findOne({ paper_id: paper_id }).then(user => {
        if(user){
            if(req.body.update_time === user.date.toString())
              res.end('N')
            // in js, can compaer string with int number
            if(req.body.update_time < user.date)
              res.end('Y')
            if(req.body.update_time > user.date)
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
