angular.module('innovate.user',[])
.controller('UserViewController',function($scope, $window, Features, $location){
	var email = $location.path().substr(12,$location.path().length);

	
	Features.getByEmail(email)
		  .then(function(response){
		  	console.log(response);
		  })
});