var express = require('express');
var qs = require('querystring');
var http = require("http");
var cheerio = require("cheerio");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	
	console.log('starting');
	var str = req.url.split('?')[1];
	var query = qs.parse(str);
	var srchKey = query.srch;
	var source = query.source;
	var extension = query.ext;
	var www = query.www;
	console.log('variables loaded');
	
	function download(url, callback) {
		// Utility function that downloads a URL and invokes
		// callback with the data.
		http.get(url, function(res) {
		var data = "";
		res.on('data', function (chunk) {
			data += chunk;
		});
		res.on("end", function() {
			callback(data);
		});
		}).on("error", function() {
		callback(null);
		});
	}
	
	var x = 'http://' + (String(www) == 'true' ? 'www.' : '') + source + '.' + extension + srchKey;
	//console.log(x);
	download(x, function(data) {
		var rtrn = '<html>';
		var $ = cheerio.load(data);
		var head = $('head');
		rtrn += String(head);
		var body = $('body');
		rtrn += (String(body) + '</html>');
		res.write(rtrn);
		res.end();
	});
	
	
});

module.exports = router;
