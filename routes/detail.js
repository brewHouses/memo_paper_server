const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated, initAuthenticated } = require('../config/auth');
const MemoRecord = require('../models/MemoRecord');

router.get('/', ensureAuthenticated, (req, res) => {
	MemoRecord.findById(req.query.id, function (err, records) {
	console.log(records)
    res.render('detail', {
		boddy: records,
    	layout: "layouts/layout_dashboard"
    })
});
});

module.exports = router;
