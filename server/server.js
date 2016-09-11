'use strict';
var mongoose = require('mongoose');
var express = require('express');

var MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost/innovaters';

mongoose.connect(MONGO_URI);

var app = express();

var port = process.env.PORT || 8000;


require('./config/middleware.js')(app,express);
require('./config/routes.js')(app,express);

// start listening on port 8000
var io = require('socket.io', { rememberTransport: false, transports: ['WebSocket', 'Flash Socket', 'AJAX long-polling'] }).listen(app.listen(port, function(){
	console.log('Listening on port ' + port); // Listening port
}));

io.sockets.on('connection', function(socket){
	console.log('Connected');
	socket.on('update priority', function(data){
		io.sockets.emit('reload', data);
	})
})

module.exports = app;
