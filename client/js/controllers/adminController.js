angular.module('innovate.admin',[])
.controller('AdminController',function($scope, Admin, $window, $location, Client){
	$scope.user ={};
	$scope.clients = [];
	$scope.login = function(){
		Admin.signin($scope.user)
			 .then(function(response){
			 	if(response.data.token){
				 	$window.localStorage.setItem('com.innov', response.data.token);
				 	$window.localStorage.setItem('com.admin', true);
				 	$location.path('/admin/home');
			 	}
			 })
	};

	if($location.path() == '/admin/home'){
		Client.getClients()
			  .then(function(response){
			  	$scope.clients = response.data
			  })
	}

	$scope.test = function(data){
		$location.path('/admin/home/'+data);
	}

	$scope.logout = function(){
		Client.signout();
	}
});