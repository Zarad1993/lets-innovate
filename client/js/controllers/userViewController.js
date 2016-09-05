angular.module('innovate.user',[])
.controller('UserViewController',function($scope, $window, Features, $location){
	var email = $location.path().substr(12,$location.path().length);
	$scope.features = [];

	$scope.runUp = function(){
		Features.getByEmail(email)
			  .then(function(response){
			  	$scope.features = response.data;
			  	for(var i = 0; i < $scope.features.length; i++){
			  		$scope.features[i].targetDate = $scope.features[i].targetDate.substr(0,$scope.features[i].targetDate.indexOf('T'));
			  	}
			  })		
	}

	$scope.delete = function(priority,client){
		Features.deleteFeature({priority : priority , client : client})
				.then(function(response){
					console.log(response);
					$window.location.reload();
				})
	}

});