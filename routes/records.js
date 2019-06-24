const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated, initAuthenticated } = require('../config/auth');

// Default page of dashboard
router.get('/', ensureAuthenticated, (req, res) =>
  res.render('records', {
    layout: "layouts/layout_dashboard"
  })
);

module.exports = router;
