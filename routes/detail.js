const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated, initAuthenticated } = require('../config/auth');
const MemoRecord = require('../models/MemoRecord');

// Default page of dashboard
router.get('/', ensureAuthenticated, (req, res) => {
    res.render('detail', {
      layout: "layouts/layout_dashboard"
    })
  }
);

module.exports = router;
