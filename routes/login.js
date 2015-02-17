var express = require('express');
var router = express.Router();
var qs = require('querystring');
var http = require("http");
var mongoose = require('mongoose');
var cpkAuth = require('../routes/cpkAuth');
require('date-utils');

router.post('/', function(req, res){
	var db = mongoose.connection;
	
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function() {
		
		var db = mongoose.connection;		
		var testUser = mongoose.model('testUser');	
		
		testUser.findOne({$and: [{'username': req.body.username}, {'account_type': 'admin'}]}, function(err, rslt1) {
			if (err) {
				mongoose.disconnect();
				res.json({'success': 'error', rslt: 'null'});
			} else if (rslt1 == null) {
				mongoose.disconnect();
				res.json({'success': 'false', rslt: 'null'});
			} else {
				var pass = rslt1.pwd;
				var salt = rslt1.slt;
				var valid = 'false';
				console.log(pass);
				console.log(salt);
				console.log(req.body.password);
				if (cpkAuth.cpkDecrypt(String(req.body.password).trim(), pass, salt)) {
					valid = 'true?&' + String(rslt1._id) + '?&' + String(rslt1.username);
				} 
				
				mongoose.disconnect();
				res.json({'success': 'true', rslt: valid});
			}
		});
	});
	
	mongoose.connect('mongodb://cpkadmin:bballrulz@ds055680.mongolab.com:55680/cpkdevdb1');
});

module.exports = router;