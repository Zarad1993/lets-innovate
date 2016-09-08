'use strict';
var Admin = require('./adminModel.js');
var jwt = require('jwt-simple');
var helpers = require('./../config/helpers.js');

module.exports = {

	signin : function(req,res){
		var adminEmail = req.body.email;
		var password = req.body.password;

		Admin.findOne({email : adminEmail})
			.exec(function(err, admin){
				if(!admin){
					helpers.errorHandler('Email or Password is Incorrect',req,res);
				} else{
         	        Admin.comparePassword(password,admin.password, res, function(found){
	    		        if(found){
	   				       var token = jwt.encode(admin, 'secret');
	     			        res.setHeader('x-access-token',token);
	     			        //modified the response to send the username
	     			        //to save it in local stoarge to be accessed late
	                        res.json({token:token, email: adminEmail});
	  			        } else {
	   				       helpers.errorHandler('Wrong Password', req, res);
	                    }
	                });
				}
            });	
	}, 

	signup : function(req,res){
		var adminName = req.body.name;
		var adminEmail = req.body.email;
		var password = req.body.password;
		
		var newAdmin = new Admin({
			name : adminName,
			email : adminEmail,
			password : password
		});
		if(password && adminEmail){
			newAdmin.save(function(err,saved){
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