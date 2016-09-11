'use strict';
angular.module('innovate.admin',[])
.controller('AdminController',function($scope, Admin, $window, $location, Client, Features){
	$scope.user ={};  // user -- > admin
	$scope.clients = []; // clients in application
	$scope.numberOfRequests = 0; // Number of requests in total

	// Sign in Function
	$scope.login = function(){
		Admin.signin($scope.user)
			 .then(function(response){
			 	if(response.data.token){
				 	$window.localStorage.setItem('com.innov', response.data.token);
				 	$window.localStorage.setItem('com.admin', true);
				 	$location.path('/admin/home');
			 	}
			 });
	};

	// Calling the same controller in different route

	if($location.path() === '/admin/home'){
		$scope.sortType     = 'name'; // set the default sort type
		$scope.sortReverse  = false;  // set the default sort order

		// Get All clients in Database
		Client.getClients()
			  .then(function(response){
			  	$scope.clients = response.data;
			  });

		// Get Total number of requests
		Features.getFeatures()
				.then(function(response){
					$scope.numberOfRequests = response.data.length;
				})
				.catch(function(error){
					console.log(error);
				});
	}

	// Display client's Data
	$scope.showClient = function(data){
		$location.path('/admin/home/'+data);
	};

	// Logout
	$scope.logout = function(){
		Client.signout();
	};

});