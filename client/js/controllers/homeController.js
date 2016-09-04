angular.module('innovate.home',[])

.controller('HomeController', function($scope, Client, Features, $window){	
	$scope.feature = {};


	$scope.startUp = function(){
		$scope.client = {};
		Client.checkClient({email:$window.localStorage.getItem('com.email')})
			  .then(function(response){
			  	$scope.client.name = response.data.name;
			  })
			  .catch(function(error){
			  	console.log(error);
			  })	
	}
	$scope.logout = function(){
		Client.signout();
	}
	$scope.sendRequest = function(){
		console.log('coming here');
		Features.addFeature($scope.feature)
				.then(function(response){
					console.log(response);
					$window.location.reload();
					alert('A message has been sent to the client');
				})
				.catch(function(error){
					console.log(error);
				});
	}
})