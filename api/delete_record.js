const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated, initAuthenticated } = require('../config/auth');
const MemoRecord = require('../models/MemoRecord');

router.post('/', ensureAuthenticated, (req, res) => {
    console.log(req.body);
    res.end("OK");
});

module.exports = router;
