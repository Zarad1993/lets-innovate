"use strict";
var mongoose = require('mongoose');
var express = require('express');

var MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost/innovaters';

mongoose.connect(MONGO_URI);

var app = express();

var port = process.env.PORT || 8000;

// start listening on port 8000
var listener = app.listen(port , function(){
	console.log('Listening on port ' + listener.address().port); // Listening port
});

require('./config/middleware.js');
// TODO
// Get the routes Done

module.exports = app;
