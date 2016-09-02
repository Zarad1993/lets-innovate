'use strict';
// Require all the controller functions here 
var helpers = require('./helpers.js');
var clientController = require('./../Client/clientController.js');
var featureController = require('./../Features/featureController.js');

module.exports = function(app){
	app.post('/api/innov/signin', clientController.signin);
	app.post('/api/innov/signup', clientController.signup);
	app.get('/api/innov/clients', clientController.getClients);

	app.post('/api/innov/add', featureController.addNewFeature);
	app.get('/api/innov/features', featureController.getAllFeatures);


    // If a request is sent somewhere other than the routes above,
    // send it through our custom error handler
    app.use(helpers.errorLogger);
    app.use(helpers.errorHandler);
};