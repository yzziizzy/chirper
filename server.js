




function nt() {
	var args = Array.prototype.slice.apply(arguments, 1);
	var cb = arguments[0];
	if(args[args.length-1]) console.log(args[args.length-1]);
	if(!cb) console.log("nt called without a function.");
	process.nextTick(function() { cb.apply(this, args) });
}





var Promise = require('bluebird');
var async = require('async');
var fs = require('fs');
var crypto = require('crypto');
var Path = require('path');




var argv = require('minimist')(process.argv.slice(2));


var async = require('async');
var mysql = require('mysql');
var fs = require('fs');
var util = require('util');




var config = require('./config');

if(argv.database) config.db.database = argv.database;


var conn = Promise.promisifyAll(mysql.createPool(config.db)); 





function insertUser(data, cb) {
	
	
	var q = 'INSERT INTO `users` (`user_hash`, `display_name`, `primary_email`, `pwd_hash`, `pwd_salt`) VALUES (?, ?, ?, ?, ?);';
	
	var d = [data.user_hash, data.display_name, data.primary_email, data.pwd_hash, data.pwd_salt];
	db.query(q, d, function(err, res) {
		if(err) {
			if(err.code == 'ER_DUP_ENTRY') {
				return nt(cb, "duplicate key.");
			}
			
			return nt(cb, err);
		}
	});
}


function insertPost(data, cb) {
	
	
	var q = 'INSERT INTO `posts` (`created_by`, `content`) VALUES (?, ?);';
	
	var d = [data.created_by, data.content];
	db.query(q, d, function(err, res) {
		if(err) {
			if(err.code == 'ER_DUP_ENTRY') {
				return nt(cb, "duplicate key.");
			}
			
			return nt(cb, err);
		}
	});
	
	
}





var express = require('express');
var serveStatic = require('serve-static');

var app = express();

app.use(require('cookie-parser')());

app.all('/path', function(req, res) {
	//req.query.compNames, sendJSON(res));
});

app.use('/', serveStatic('./static'));


var route = express.Router();




route.all('/newChirp', function(req, res) {
	
	
});


route.all('/newUser', function(req, res) {
	
	insertUser(req.params, function(res, err) {
		res.send(JSON.stringify(res));
	})
	
});



route.all('/all', function(req, res) {
	res.send(JSON.stringify(templates));
});

route.all('/tree/*', function(req, res) {
	
	
	
});













app.listen(config.port, function() {
	
	console.log("Listening on port " + config.port);
	
})













function sendJSON(res) {
	return function(err, data) {
		if(err) {
			res.status(401);
			res.end();
			return;
		}
		
		res.send(JSON.stringify(data || {}))
	}
}



