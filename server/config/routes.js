'use strict';
// Require all the controller functions here 
var helpers = require('./helpers.js');
var adminController = require('./../Admin/adminController.js');
var featureController = require('./../Features/featureController.js');
var clientController = require('./../Client/clientController.js');

module.exports = function(app){
	app.post('/api/innov/signin', adminController.signin);
	app.post('/api/innov/signup', adminController.signup);

	app.get('/api/innov/get/:email', featureController.getByEmail)
	app.post('/api/innov/add', featureController.addNewFeature);
	app.get('/api/innov/features', featureController.getAllFeatures);
	app.post('/api/innov/delete', featureController.deleteFeature);
	app.post('/api/innov/edit', featureController.getOneFeature);
	app.post('/api/innov/edit/feature', featureController.editFeature);


	app.get('/api/innov/clients', clientController.getClients);
	app.post('/api/innov/client', clientController.getOneClient);

    // If a request is sent somewhere other than the routes above,
    // send it through our custom error handler
    app.use(helpers.errorLogger);
    app.use(helpers.errorHandler);
};