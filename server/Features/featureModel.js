var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var featureSchema = new Schema({
	title : {type : String},
	description : {type : String},
	Client : {type : String},
	clientPriority : {type : Array},
	ticketUrl : {type : String},
	targetDate : { type : Number},
    area: {
	    type: String,
	    enum: ['Policies', 'Billing', 'Claims', 'Reports']
  	}
});


var Feature = mongoose.model('Feature', featureSchema);

module.exports = Feature;