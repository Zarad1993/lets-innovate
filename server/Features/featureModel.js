var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var featureSchema = new Schema({
	title : {type : String, required: true},
	description : {type : String, required: true},
	client : {type : String, required: true},
	clientPriority : {type : Number, required: true},
	ticketUrl : {type : String, required: true},
	targetDate : { type : Date, required: true},
    area: {
	    type: String,
	    enum: ['Policies', 'Billing', 'Claims', 'Reports'],
	    required: true
  	}
});


var Feature = mongoose.model('Feature', featureSchema);

module.exports = Feature;