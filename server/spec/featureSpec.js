var expect = require('chai').expect;
var server = require('./../server.js');
var chai = require('chai')
      ,chaiHttp = require('chai-http');
chai.use(chaiHttp);


// Mongoose deprecated Promise
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// Models and controllers 

var Feature = require('./../Features/featureModel.js');
var featureController = require('./../Features/featureController.js');


describe('Feature unit tests', function(done){

	it('should have a feature Model with the right fields', function(done){
		var newFeature = new Feature({
			title : 'this is a test feature',
			description : 'now i will tell you the steps one by one', 
			client : 'Client K', 
			clientPriority : '1',
			ticketUrl : '/api/innovation/no/limits', 
			targetDate : '2147302984',
			area : 'Billing'			
		});

		newFeature.save(function(err,saved){
			expect(saved).to.have.property('title');
			expect(saved).to.have.property('description');
			expect(saved).to.have.property('client');
			expect(saved).to.have.property('ticketUrl');
			expect(saved).to.have.property('targetDate');
			expect(saved).to.have.property('area');
			done();
		})
	})

	it('should have a function that gets features', function(done){
		expect(typeof featureController.getAllFeatures).to.be.equal('function');
		done();
	});

	it('should have a function that adds a new feature', function(done){
		expect(typeof featureController.addNewFeature).to.be.equal('function');
		done();
	});
})