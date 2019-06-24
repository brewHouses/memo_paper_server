const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated, initAuthenticated } = require('../config/auth');
const MemoRecord = require('../models/MemoRecord');

// Default page of dashboard
router.get('/', ensureAuthenticated, (req, res) => {
  MemoRecord.find({ email: req.user.email }).then(records => {
    // Mabe use other metod will improve the performance
    if (records)
      records.reverse()
    res.render('records', {
      records: records,
      layout: "layouts/layout_dashboard"
    })
  });
  }
);

module.exports = router;
