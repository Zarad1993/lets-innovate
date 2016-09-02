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

describe('Client Integration Tests', function(done){
	var newClient;
	beforeEach(function(done){
		newClient = new Client({
			'email' : 'myslack@gmail.com',  
			'password' : 'test'
		});
		newClient.save();
		done();
	});


	afterEach(function(done){
		Client.collection.drop();
		done();
	})

	it('should sign up when passing the required keys', function(done){
		chai.request(server)
			.post('/api/innov/signup')
			.send({
				'email' : 'secondSlack@gmail.com' , 
				'password' : 'secondTest'
			})
			.end(function(err, res){
				expect(res.status).to.be.equal(201);
				expect(res.req.res.text).to.be.equal('New User is Created');
				done();
			})
	});

	it('should handle error when passing wrong keys when signing up', function(done){
		chai.request(server)
			.post('/api/innov/signup')
			.send({
				'emails' : 'eventhough@gmail.com' ,
				'password' : 'willFail'
			})
			.end(function(err,res){
				expect(res.status).to.be.equal(500);
				done();
			})
	});

	it('should sign in by getting a token', function(done){
		var newClient = new Client({
			email : 'mohammad@gmail.com', 
			password : 'innovate'
		})
		newClient.save(function(err, saved){
			if(saved){
				chai.request(server)
					.post('/api/innov/signin')
					.send({
						email : 'mohammad@gmail.com' , 
						password : 'innovate'
					})
					.end(function(err, res){
						expect(res.body).to.have.property('token')
						expect(res.status).to.be.equal(200);
						done();
					});				
			}
		});

	});

	it('should handle error when passing wrong email or password', function(done){
		chai.request(server)
			.post('/api/innov/signin')
			.send({
				'email' : 'thisWontWork@gmail.com',
				'password' : 'howAboutNow'
			})
			.end(function(err, res){
				expect(res.status).to.be.equal(500);
				done();
			})
	});
});
