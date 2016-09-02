var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var SALT_WORK_FACTOR = 10;

var Schema = mongoose.Schema;


var clientSchema = new Schema({
  name : {type : String}, 
	email : {type : String , index : {unique : true}},
	password : {type : String}
})

clientSchema.pre('save', function(next){
  var client = this;
  // only hash the password if it has been modified (or is new)
  if (!client.isModified('password')) {
    return next();
  }
// generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) {
      return next(err);
    }
    // hash the password along with our new salt
    bcrypt.hash(client.password, salt, null, function (err, hash) {
      if (err) {
        return next(err);
      }
      // override the cleartext password with the hashed one
      client.password = hash;
      client.salt = salt;
      next();
    });
  });	
})

var Client = mongoose.model('Client', clientSchema);

Client.comparePassword = function(candidatePassword, savedPassword, res, cb){
  bcrypt.compare( candidatePassword, savedPassword, function(err, isMatch){
    if(err){
      res.status(500).send('Wrong Password');
    } else if(cb){
      cb(isMatch);
    }
  });
};

module.exports = Client;