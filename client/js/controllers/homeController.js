angular.module('innovate.home',[])

.controller('HomeController', function($scope, Client, Features, $window, $location){	
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
					$window.location.reload();
				})
				.catch(function(error){
					console.log(error);
				});
	};

	$scope.myTickets = function(email){
		var data = $window.localStorage.getItem('com.email')
		$location.path('/admin/home/'+data);
	}
})