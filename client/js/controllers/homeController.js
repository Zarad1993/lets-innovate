angular.module('innovate.home',[])

.controller('HomeController', function($scope, Client, Features){	
	$scope.clients;
	$scope.feature = {};
	Client.getClients()
		  .then(function(response){
		  	$scope.clients = response.data;
		  })
		  .catch(function(error){
		  	console.log(error);
		  })
	$scope.sendRequest = function(){
		Features.addFeature($scope.feature)
				.then(function(response){
					alert('A message has been sent to the client');
				})
				.catch(function(error){
					console.log(error);
				});
	}
})