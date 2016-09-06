angular.module('innovate.user',[])
.controller('UserViewController',function($scope, $window, Features, $location){
	var email = $location.path().substr(12,$location.path().length);
	$scope.features = [];
	$scope.flag = true;
	$scope.runUp = function(){
		Features.getByEmail(email)
			  .then(function(response){
			  	if(response.data.length > 0){
				  	$scope.features = response.data;
				  	for(var i = 0; i < $scope.features.length; i++){
				  		$scope.features[i].targetDate = $scope.features[i].targetDate.substr(0,$scope.features[i].targetDate.indexOf('T'));
				  	}
			  	} else {
			  		if($window.localStorage.getItem('com.admin')){
			  			$location.path('/admin/home');
			  		} else {
			  			$location.path('/');
			  		}
			  		alert('This client has no more feature Requests');
			  	}

			  });
		if($window.localStorage.getItem('com.admin')){
			$scope.flag = false;
		}
	}

	$scope.delete = function(priority,client){
		Features.deleteFeature({priority : priority , client : client})
				.then(function(response){
					$window.location.reload();
				})
	};

	$scope.goBack = function(){
		if($window.localStorage.getItem('com.admin')){
			$location.path('/admin/home');
		} else {
			$location.path('/');
		}
	};


	$scope.test = function(){
		console.log('Testing');
	}

});