'use strict';
var Client = require('./clientModel.js');
var helpers = require('./../config/helpers.js');

module.exports = {

	getClients : function(req, res){
		Client.find({})
			  .exec(function(err, allClients){
			  	if(!allClients){
			  		helpers.errorHandler('Error Getting Clients', req, res);
			  	} else {
			  		res.status(200).send(allClients);
			  	}
			  });
	},

	
	getOneClient : function(req, res){
		Client.findOne({email : req.body.email})
			  .exec(function(err, client){
			  	if(client){
			  		res.status(200).send(client);
			  	} else {
			  		var newClient = new Client({
			  			name : req.body.name,
			  			email : req.body.email
			  		});
			  		newClient.save(function(err,saved){
			  			if(saved){
			  				res.status(200).send(saved);
			  			}
			  		});
			  	}
			  });
	}
};