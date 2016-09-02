var expect = require('chai').expect;
var server = require('./../server.js');
var chai = require('chai')
      ,chaiHttp = require('chai-http');
chai.use(chaiHttp);


// Mongoose deprecated Promise
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// Models and controllers 

var Client = require('./../Client/clientModel.js');
var clientController = require('./../Client/clientController.js');

describe('Client Unit Tests', function(done){
	var newClient;
	beforeEach(function(done){
		newClient = new Client({
			email : 'mohammad.albakri93@gmail.com',
			password : 'test123'
		});
		done();
	});

	afterEach(function(done){
		Client.collection.drop();
		done();
	});

	it('every client should have an email and password',function(done){
		newClient.save(function(err,user){
			Client.findOne({'email': 'mohammad.albakri93@gmail.com'})
				  .exec(function(err,user){
				  	expect(typeof user.email).to.be.equal('string');
				  	expect(user).to.have.property('email');
				  	expect(user).to.have.property('password');
				    done();
    		});
		});
	});

	it('should have return array when calling all clients', function(done){
		newClient.save(function(err,saved){
			Client.find().exec(function(err,clients){
		      	expect(clients.length).to.be.equal(1);
		      	done();			
			})
		});
	});

	it('should have a sign in method for every client' , function(done){
		expect(typeof clientController.signin).to.be.equal('function');
		done();
	})

	it('should have a signup method for every client', function(done){
		expect(typeof clientController.signup).to.be.equal('function');
		done();
	})

});

// describe('Client Integration Tests', function(done){
// 	var newClient;
// 	beforeEach(function(done){
// 		var newClient = new Client({
// 			'email' : 'myslack@gmail.com',  
// 			'password' : 'test'
// 		});
// 		done();
// 	});


// 	afterEach(function(done){
// 		Client.collection.drop();
// 		done();
// 	})

// 	it('sample test', function(done){
// 		expect(true).to.be.equal(true);
// 		done();
// 	})
// })