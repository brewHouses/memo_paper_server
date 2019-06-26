const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated, initAuthenticated } = require('../config/auth');
const User = require('../models/User');

router.post('/', (req, res) => {
    console.log(req.body);
    res.end("UPDATE")
});

module.exports = router;
