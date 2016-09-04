var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var clientSchema = new Schema({
  name : {type : String , required: true}, 
	email : {type : String , index : {unique : true} , required:true}
})

var Client = mongoose.model('Client', clientSchema);

module.exports = Client;