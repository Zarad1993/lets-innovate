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
	$scope.test = function(){
		console.log($scope.feature);

		// Features.addFeature($scope.feature)
		// 		.then(function(response){
		// 			alert(response.data);
		// 		})
		// 		.catch(function(error){
		// 			console.log(error);
		// 		});
		alert('A message has been sent to the client');
	}
})