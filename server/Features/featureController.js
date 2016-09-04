var sendEmail = require('./../emailNotifications.js');
var Client = require('./../Client/clientModel.js'),
	Feature = require('./featureModel.js'),
	helpers = require('./../config/helpers.js');


module.exports = {
	getAllFeatures : function(req, res){
		Feature.find({})
			   .sort({'clientPriority' : '1'})
			   .exec(function(err, features){
			   	if(!features){
			   		helpers.errorHandler('Error Getting Features', req, res);
			   	} else {
			   		res.status(200).send(features);
			   	}
			   });
	},

	addNewFeature : function(req, res){
		var featureTitle = req.body.title,
			featureDesc = req.body.description,
			featureClient = req.body.client,
			featureURL = req.body.ticketUrl,
			featureDate = req.body.targetDate,
			featureArea = req.body.area
			featurePriority = req.body.clientPriority,
			flag = true;

			// Still to fill the client Priority

		var newFeature = new Feature({
			title : featureTitle,
			description : featureDesc, 
			client : featureClient, 
			clientPriority : featurePriority,
			ticketUrl : featureURL, 
			targetDate : featureDate,
			area : featureArea
		});


		Feature.find({client : featureClient})
			   .exec(function(err, features){
			   		for(var i = 0; i < features.length; i++){
			   			if(features[i].clientPriority == featurePriority){
			   				helpers.errorHandler('This number is Prioritized', req, res);
			   				flag = false;
			   			} 
			   		}
			   		Client.findOne({name : featureClient})
			   			  .exec(function(err, client){
			   			  	if(!client){
			   			  		helpers.errorHandler('This is not a subscribed client', req, res);
			   			  	} else {
								if(flag){
						   			newFeature.save(function(err,saved){
						   				if(saved){
						   					// TODO SEND TO THE CLIENT AN EMAIL OF THE NEW FEATURE REQUEST
						   					Client.findOne({name : saved.client})
						   						  .exec(function(err, client){
						   						  	console.log(client.email);
						   						  })
						   					res.status(201).send('Feature Successfully Submitted');
						   				}
						   			})
								}			   			  		
			   			  	}
			   			  })
			   })


	}
};

