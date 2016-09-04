var expect = require('chai').expect;
var server = require('./../server.js');
var chai = require('chai')
      ,chaiHttp = require('chai-http');
chai.use(chaiHttp);


// Mongoose deprecated Promise
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// Models and controllers 

var Admin = require('./../Admin/adminModel.js');
var adminController = require('./../Admin/adminController.js');

describe('Admin Unit Tests', function(done){
	var newAdmin;
	beforeEach(function(done){
		newAdmin = new Admin({
			email : 'mohammad.albakri93@gmail.com',
			password : 'test123'
		});
		done();
	});

	afterEach(function(done){
		Admin.collection.drop();
		done();
	});

	it('every amdin should have an email and password',function(done){
		newAdmin.save(function(err,user){
			Admin.findOne({'email': 'mohammad.albakri93@gmail.com'})
				  .exec(function(err,user){
				  	expect(typeof user.email).to.be.equal('string');
				  	expect(user).to.have.property('email');
				  	expect(user).to.have.property('password');
				    done();
    		});
		});
	});

	it('should have return array when calling all Admins', function(done){
		newAdmin.save(function(err,saved){
			Admin.find().exec(function(err,admins){
		      	expect(admins.length).to.be.equal(1);
		      	done();			
			})
		});
	});

	it('should have a sign in method for every admin' , function(done){
		expect(typeof adminController.signin).to.be.equal('function');
		done();
	})

	it('should have a signup method for every admin', function(done){
		expect(typeof adminController.signup).to.be.equal('function');
		done();
	})

});

describe('Admin Integration Tests', function(done){
	var newAdmin;
	beforeEach(function(done){
		newAdmin = new Admin({
			'email' : 'myslack@gmail.com',  
			'password' : 'test'
		});
		newAdmin.save();
		done();
	});


	afterEach(function(done){
		Admin.collection.drop();
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
		var newAdmin = new Admin({
			email : 'mohammad@gmail.com', 
			password : 'innovate'
		})
		newAdmin.save(function(err, saved){
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
