'use strict';
angular.module('innovate.services',[])

.factory('Client', function($window, $http, $location){
	// Our services for client

	// Check if user is Authenticated
    var isAuth = function () {
        return !!$window.localStorage.getItem('com.innov');
	};


	// Signout Function
	var signout = function () {
	    localStorage.clear();
	    $window.localStorage.clear();
	    $location.path('/signin');
	};


	// Check if client is in our queries
	var checkClient = function(name){
		return $http({
			method : 'POST',
			url : '/api/innov/client',
			data : name
		})
		.then(function(response){
			return response;
		})
		.catch(function(error){
			return error;
		});
	};

	// Call all clients
	var getClients = function(){
		return $http({
			method : 'GET',
			url : '/api/innov/clients'
		})
		.then(function(response){
			return response;
		})
		.catch(function(error){
			return error;
		});
	};
	return{
		isAuth : isAuth,
		signout : signout,
		checkClient: checkClient,
		getClients : getClients
	};
})
.factory('Features', function($window,$http){

	// Feature Services 

	// Get all features
	var getFeatures = function(){
		return $http({
			method : 'GET',
			url : '/api/innov/features'
		})
		.then(function(response){
			return response;
		})
		.catch(function(error){
			return error;
		});
	};


	// Get features by email
	var getByEmail = function(email){
		return $http({
			method : 'GET' ,
			url : '/api/innov/get/'+email
		})
		.then(function(response){
			return response;
		})
		.catch(function(error){
			return error;
		});
	};

	// Add a new Feature
	var addFeature = function(data){
		return $http({
			method : 'POST' ,
			url : '/api/innov/add',
			data : data
		})
		.then(function(response){
			return response;
		})
		.catch(function(error){
			return error;
		});
	};

	// Delete a Feature
	var deleteFeature = function(data){
		return $http({
			method : 'POST', 
			url : '/api/innov/delete',
			data : data
		})
		.then(function(response){
			return response;
		})
		.catch(function(error){
			return error;
		});
	};


	// Call one Feature
	var getOneFeature = function(data){
		return $http({
			method : 'POST',
			url : '/api/innov/edit',
			data : data
		})
		.then(function(response){
			return response;
		})
		.catch(function(error){
			return error;
		});
	};

	// Edit a feature
	var editFeature = function(data){
		return $http({
			method : 'POST',
			url : '/api/innov/edit/feature',
			data : data
		})
		.then(function(response){
			return response;
		})
		.catch(function(error){
			return error;
		});
	};

	var updatePriorities = function(data){
		return $http({
			method : 'POST',
			url : '/api/innov/reorder',
			data : data
		})
		.then(function(response){
			return response;
		})
		.catch(function(error){
			return error;
		})
	};

	return {
		getFeatures : getFeatures,
		addFeature : addFeature,
		getByEmail : getByEmail,
		deleteFeature : deleteFeature,
		getOneFeature : getOneFeature,
		editFeature : editFeature,
		updatePriorities : updatePriorities

	};
})
.factory('Admin', function($window,$http){
	// Admin Services

	// Admin signin
	var signin = function(data){
		return $http({
			method : 'POST' , 
			url : '/api/innov/signin',
			data : data
		})
		.then(function(response){
			return response;
		})
		.catch(function(error){
			return error;
		});
	};
	return {
		signin : signin
	};
});