angular.module('innovate.features',[])
.controller('AllFeatureController', function($scope, Features, $location, $window, Client){
	Features.getFeatures()
			.then(function(response){
				$scope.features = response.data;
			})
			.catch(function(error){
				console.log(error);
			})


	$scope.logout = function(){
		Client.signout();
	}
})