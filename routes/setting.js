const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated, initAuthenticated } = require('../config/auth');
const User = require('../models/User');

router.get('/', ensureAuthenticated, (req, res) => {
    res.render('setting', {
      layout: "layouts/layout_dashboard"
    })
  }
);

router.post('/', ensureAuthenticated, (req, res) => {
    User.findOne( { email: req.user.email }, function (err, record) {
    if(err){
      console.error(err);
      res.redirect('/500');
    }else{
      record.name = req.body.name
      record.paper_id = req.body.paper_id
      record.mode = req.body.mode
      record.save().then( () => {
        res.redirect('/setting');
      })
    }
  })
});

module.exports = router;
