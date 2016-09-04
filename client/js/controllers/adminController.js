angular.module('innovate.admin',[])
.controller('AdminController',function($scope, Admin){
	$scope.user ={};
	$scope.login = function(){
		Admin.signin($scope.user)
			 .then(function(response){
			 	console.log(response);
			 })
	}
});