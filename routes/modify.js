const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated, initAuthenticated } = require('../config/auth');
const MemoRecord = require('../models/MemoRecord');

router.get('/', ensureAuthenticated, (req, res) => {
    res.render('modify', {
      layout: "layouts/layout_dashboard"
    })
  }
);

module.exports = router;
