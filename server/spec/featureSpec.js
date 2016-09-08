'use strict';
var expect = require('chai').expect;
var server = require('./../server.js');
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

var clientController = require('./../Client/clientController');
var Client = require('./../Client/clientModel');
var Feature = require('./../Features/featureModel');
var featureController = require('./../Features/featureController');


describe('Feature unit tests', function(){


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
		});
		Feature.collection.drop();
	});

	it('should have a function that gets features', function(done){
		expect(typeof featureController.getAllFeatures).to.be.equal('function');
		done();
	});

	it('should have a function that adds a new feature', function(done){
		expect(typeof featureController.addNewFeature).to.be.equal('function');
		done();
	});

	it('should have a function that deletes a feature',function(done){
		expect(typeof featureController.deleteFeature).to.be.equal('function');
		done();
	});

	it('should have a function that edits a feature', function(done){
		expect(typeof featureController.editFeature).to.be.equal('function');
		done();
	});

	it('should have a function that gets One Feature', function(done){
		expect(typeof featureController.getOneFeature).to.be.equal('function');
		done();
	});

	it('should have a function that get a feature when passing email in params', function(done){
		expect(typeof featureController.getByEmail).to.be.equal('function');
		done();
	});

});

describe('Integration Tests', function(){
	beforeEach(function(done){
		var client = new Client({
			'name' : 'Mohammad Albakri',
			'email' : 'mohammad.albakri93@gmail.com'
		});
		client.save();
		done();
	});


})