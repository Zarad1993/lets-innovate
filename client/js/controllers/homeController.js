angular.module('innovate.home',[])

.controller('HomeController', function($scope){

	$scope.test = function(){
		alert('A message has been sent to the client');
	}
})