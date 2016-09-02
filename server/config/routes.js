'use strict';
// Require all the controller functions here 
var helpers = require('./helpers.js');
var clientController = require('./../Client/clientController.js');

module.exports = function(app){
	app.post('/api/innov/signin', clientController.signin);
	app.post('/api/innov/signup', clientController.signup);



    // If a request is sent somewhere other than the routes above,
    // send it through our custom error handler
    app.use(helpers.errorLogger);
    app.use(helpers.errorHandler);
};