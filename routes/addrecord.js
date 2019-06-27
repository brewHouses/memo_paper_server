const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated, initAuthenticated } = require('../config/auth');
const MemoRecord = require('../models/MemoRecord');
const User = require('../models/User');

function touch_user_date(email){
    User.findOne({ email: email }).then(user => {
      console.log(user.date);
      user.date = Date.now()
      user.save()
    });
}

router.get('/', ensureAuthenticated, (req, res) =>
  res.render('addrecord', {
    layout: "layouts/layout_dashboard"
  })
);

router.get('/simple', ensureAuthenticated, (req, res) =>
  res.render('addrecord_simple', {
    layout: "layouts/layout_dashboard"
  })
);

router.post('/', ensureAuthenticated, (req, res) => {
    req_class = ""
    if (req.body.class_study === "on")
      req_class = "study"
    else if (req.body.class_life === "on")
      req_class = "life"
    else if (req.body.class_other === "on")
      req_class = "other"
    top = false
    if(req.body.top === 'on')
      top = true
    const newRecord = new MemoRecord({
      email: req.user.email,
      record: req.body.memo_entry,
      deadline: req.body.deadline,
      class: req_class,
      position: req.body.position,
      priority: req.body.priority,
      top: top,
      comments: req.body.comments,
      status: req.body.status
    })
    newRecord
      .save()
      .then(user => {
        touch_user_date(req.user.email)
        req.flash(
          'success_msg',
          'You are now registered and can log in'
        );

        res.redirect('/records');
      })
      .catch(err => console.log(err));
  }
);

router.post('/simple', ensureAuthenticated, (req, res) => {
    const newRecord = new MemoRecord({
      email: req.user.email,
      record: req.body.memo_entry,
    })
    newRecord
      .save()
      .then(user => {
        touch_user_date(req.user.email)
        req.flash(
          'success_msg',
          'You are now registered and can log in'
        );
        res.redirect('/dashboard');
      })
      .catch(err => console.log(err));
  }
);

module.exports = router;
