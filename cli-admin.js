var mysql = require('mysql');


var async = require('async');
var colors = require('colors');
var argv = require('minimist')(process.argv.slice(2));
var util = require('util');
var fs = require('fs');
var Path = require('path');





var config = require('./config');

if(argv.pwd) {
	config.db.password = argv.pwd;
}



config.db.multipleStatements = true;
delete config.db.database;
var conn = mysql.createConnection(config.db);


/*

node ./cli-admin.js --create <name>




*/


if(argv.create) {
	async.series([
		createdb(argv.create),
		usedb(argv.create),
		initschema(),
	], quit);
}



if(argv.reset) {
	async.series([
		dropdb(argv.reset),
		createdb(argv.reset),
		usedb(argv.reset),
		initdb(),
	], quit);
}












function quit(err) {
	if(err) console.log(err);
	conn.end();
}

function errcb(cb) {
	return function(err) {
		if(err) console.log(err);
		cb(err);
	}
}

function usedb(db) {
	return function(cb) {
		conn.query('use `'+db+'`;', errcb(cb))
	}
}

function createdb(db) {
	return function(cb) {
		console.log("creating database " + db);
		conn.query('CREATE DATABASE IF NOT EXISTS `'+db+'`;', errcb(cb))
		console.log('    done');
	}
}

function initschema() {
	return function(cb) {
		console.log('initializing database...');
		var schema = fs.readFileSync('./schema.sql', 'utf-8'); 
		conn.query(schema, errcb(cb));
		
		console.log('    done');
	}
}

function dropdb(db) {
	return function(cb) {
		console.log('dropping database ' + db);
		conn.query(
			'DROP DATABASE `'+db+'`; '
			, errcb(cb))
		console.log('    done');
	}
}












