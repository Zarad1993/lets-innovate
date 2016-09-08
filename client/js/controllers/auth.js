'use strict';
angular.module('innovate.auth',[])
.controller('AuthController', function($scope, $location, $window, Client){


	// If the user is logged in
	// Do not allow in signin page anymore
	$scope.checkUser = function(){
		if(Client.isAuth()){
			window.alert('You Are Already Logged In');
			$location.path('/');
		}
	};

	// OAuth (Github - Google) Sign in
	$scope.signWithAuth = function(provider){
		OAuth.popup(provider)
		.then(function(result) {
			$window.localStorage.setItem('com.innov', result.access_token); // save token in local Storage
			// result.me() requests from our API's to send back information -- i.e : Email , Name .. etc..
		  result.me().then(function(data){
		  	$scope.addClient(data);
		  });
		})
		.fail(function (err) {
			console.log(err);
		});				
	};

	// Checks if we have the same email in Database
	// If not then a new query will be added in database with new name and email
	$scope.addClient = function(data){
		Client.checkClient({name : data.name, email : data.email})
			  .then(function(){
				setTimeout(function(){
					$window.localStorage.setItem('com.email',data.email);
					$window.localStorage.setItem('com.client',true);
					$location.path('/');
					$scope.$apply();
				},250);
			  })
			  .catch(function(error){
			  	console.log(error);
			  });
	};

		
});