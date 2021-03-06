const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const code = require('../config/invite_code')
// Load User model
const User = require('../models/User');
const { forwardAuthenticated } = require('../config/auth');

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login', {layout: "layouts/layout"}));

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register', {layout: "layouts/layout"}));

// Register
router.post('/register', (req, res) => {
  const { name, email, password, password2, invite_code, paper_id } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2 || !invite_code || !paper_id) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (invite_code !== code.code) {
    errors.push({ msg: 'Wrong invite code, you could connect weikai by WeWang@suse.com' });
  }

  if (errors.length > 0) {
    res.render('register', {
      layout: "layouts/layout",
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          layout: "layouts/layout",
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        const newUser = new User({
          name,
          email,
          password,
          paper_id
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});


// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {failureFlash: true }, (err, user, info) => {
    if(err)
      return res.json({"status": false, "message": info.message});
    if(user === false)
      return res.json({"status": false, "message": info.message});
    req.logIn(user, function(err) {
      if (err)
        return res.json({"status": false, "message": info.message});
      return res.json({"status": true});
    });
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

module.exports = router;
