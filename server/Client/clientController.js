'use strict';
var Client = require('./clientModel.js');
var jwt = require('jwt-simple');
var helpers = require('./../config/helpers.js');

module.exports = {
	signin : function(req,res){
		var clientEmail = req.body.email;
		var password = req.body.password;

		Client.findOne({email : clientEmail})
			.exec(function(err, client){
				if(!client){
					helpers.errorHandler('Email or Password is Incorrect',req,res);
				} else{
         	        Client.comparePassword(password,client.password, res, function(found){
	    		        if(found){
	   				       var token = jwt.encode(client, 'secret');
	     			        res.setHeader('x-access-token',token);
	     			        //modified the response to send the username
	     			        //to save it in local stoarge to be accessed late
	                        res.json({token:token, email: clientEmail});
	  			        } else {
	   				       helpers.errorHandler('Wrong Password', req, res);
	                    }
	                });
				}
            });	
	}, 

	signup : function(req,res){
		var clientEmail = req.body.email;
		var password = req.body.password;
		
		var newClient = new Client({
			email : clientEmail,
			password : password
		});
		if(password && clientEmail){
			newClient.save(function(err,saved){
				if(saved){
					res.status(201).send('New User is Created');
				} else {
					helpers.errorHandler('Email was not set properly', req, res);
				}
			});
		} else {
			helpers.errorHandler('Email was not set properly', req, res);
		}
	}
};