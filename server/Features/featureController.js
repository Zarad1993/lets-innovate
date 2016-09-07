var sendEmail = require('./../emailNotifications.js');
var Client = require('./../Client/clientModel.js'),
	Feature = require('./featureModel.js'),
	helpers = require('./../config/helpers.js');


module.exports = {

	getByEmail : function(req, res){
		var email  = req.params.email;
		Client.findOne({email : email})
			  .exec(function(err, user){
			  	if(user){
					Feature.find({})
							.sort({'clientPriority' : '1'})
							.exec(function(err, features){
								if(!features){
									helpers.errorHandler('Error Providing Features', req, res)
								} else {
									var filteredFeatures = [];
									for(var i =0 ; i < features.length; i++){
										if(features[i].client == user.name){
											filteredFeatures.push(features[i]);
										}
									}
									res.status(200).send(filteredFeatures);
								}
							})
			  	}
			  })
	},

	getOneFeature : function(req, res){
		var priority = req.body.priority;
		var email = req.body.email;
		Client.findOne({email : email})
			  .exec(function(err, user){
			  	if(!user){
			  		helpers.errorHandler('Error Getting User', req, res);
			  	} else {
			  		Feature.findOne({client : user.name, clientPriority : priority})
			  			   .exec(function(err, feature){
			  			   	if(!feature){
			  					helpers.errorHandler('Error Getting User', req, res);   		
			  			   	} else {
			  			   		res.status(200).send(feature);
			  			   	}
			  			   });
			  	}
			  });
	},

	editFeature : function(req, res){
		Feature.findOne({_id : req.body._id})
			   .exec(function(err, feature){
			   		if(!feature){
			   			helper.errorHandler('Could Not Get Feature', req, res);
			   		} else {
			   			feature.title = req.body.title;
			   			feature.description = req.body.description;
			   			feature.clientPriority = req.body.clientPriority;
			   			feature.targetDate = req.body.targetDate;
			   			feature.ticketUrl = req.body.ticketUrl;
			   			feature.area = req.body.area;

			   			feature.save(function(err, saved){
			   				if(!saved){
			   					helpers.errorHandler('Error While Saving Data', req, res);
			   				} else {
			   					res.status(201).send('Edited Successfully');
			   				}
			   			})
			   		}
			   })
	},

	deleteFeature : function(req, res){
		var priority = req.body.priority;
		var client = req.body.client;
		Feature.find({ client : client , clientPriority : priority})
			   .remove()
			   .exec(function(err, data){
			   		if(data.result.n){
			   			res.status(201).send('Feature Successfully Deleted');
			   		} else {
			   			res.status(500).send('Error Deleting Requested Feature');
			   		}
			   })
	},

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
						   					// TODO SEND TO THE ADMIN AN EMAIL OF THE NEW FEATURE REQUEST
						   					Client.findOne({name : saved.client})
						   						  .exec(function(err, client){
						   						  	console.log(client.email);
						   						  });
						   					res.status(201).send('Feature Successfully Submitted');
						   				}
						   			});
								}			   			  		
			   			  	}
			   			  });
			   });
	}
};

