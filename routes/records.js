const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated, initAuthenticated } = require('../config/auth');
const MemoRecord = require('../models/MemoRecord');

// Default page of dashboard
router.get('/', ensureAuthenticated, (req, res) => {
  MemoRecord.find({ email: req.user.email }, null, {sort:{date: -1}}).then(records => {
    // Mabe use other metod will improve the performance
    res.render('records', {
      records: records,
      layout: "layouts/layout_dashboard"
    })
  });
  }
);

module.exports = router;
