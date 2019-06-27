const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated, initAuthenticated } = require('../config/auth');
const MemoRecord = require('../models/MemoRecord');
const User = require('../models/User');

function touch_user_date(email){
	User.findOne({email: email}).then(user => {
		console.log(user.date);
		user.date = Date.now()
		user.save()
	});
}

router.get('/', ensureAuthenticated, (req, res) => {
	MemoRecord.findById(req.query.id, function (err, records) {
	console.log(records)
    res.render('modify', {
		boddy: records,
    	layout: "layouts/layout_dashboard"
    })
});
});

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
	MemoRecord.findOne( {_id: req.body.item_id}, function (err, record) {
		if(err){
			res.redirect('/500');
		}else{
				record.email = req.user.email,
				record.record = req.body.memo_entry,
				record.deadline = req.body.deadline,
				record.class = req_class,
				record.position = req.body.position,
				record.priority = req.body.priority,
				record.top = top,
				record.comments = req.body.comments,
				record.status = req.body.status
				record.save().then( user => {
					touch_user_date(req.user.email)
					res.redirect('/records');
				})
			}
		})
		.catch(err => console.log(err));
});

module.exports = router;
