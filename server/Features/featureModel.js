var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var featureSchema = new Schema({
	title : {type : String},
	description : {type : String},
	client : {type : String},
	clientPriority : {type : Number},
	ticketUrl : {type : String},
	targetDate : { type : Date},
    area: {
	    type: String,
	    enum: ['Policies', 'Billing', 'Claims', 'Reports']
  	}
});


var Feature = mongoose.model('Feature', featureSchema);

module.exports = Feature;