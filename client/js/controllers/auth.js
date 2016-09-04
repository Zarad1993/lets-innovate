angular.module('innovate.auth',[])
.controller('AuthController', function($scope, $location, $window, Client){

	$scope.signWithAuth = function(provider){
		OAuth.popup(provider)
		.then(function(result) {
			console.log(result);
			$window.localStorage.setItem('com.innov', result.access_token);
		  result.me().then(function(data){
		  	console.log(data);
			setTimeout(function(){
				$location.path('/');
				$scope.$apply();
			},2000);
		  })
		})
		.fail(function (err) {
			console.log(err)
		  //handle error with err
		});				
	}	
})