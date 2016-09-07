angular.module('innovate.admin',[])
.controller('AdminController',function($scope, Admin, $window, $location, Client, Features){
	$scope.user ={};
	$scope.clients = [];
	$scope.numberOfRequests = 0;
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
		$scope.sortType     = 'name'; // set the default sort type
		$scope.sortReverse  = false;  // set the default sort order

		Client.getClients()
			  .then(function(response){
			  	$scope.clients = response.data
				for(var i = 0; i < $scope.clients.length; i++){
					var temp = i;
					Features.getByEmail($scope.clients[i].email)
							.then(function(secondResponse){
								$scope.clients[temp].requests = secondResponse.data.length;
							})
							.catch(function(error){
								console.log(error);
							})
				}
			  });
		Features.getFeatures()
				.then(function(response){
					$scope.numberOfRequests = response.data.length;
				})
				.catch(function(error){
					console.log(error);
				});
	}

	$scope.showClient = function(data){
		$location.path('/admin/home/'+data);
	}

	$scope.logout = function(){
		Client.signout();
	}
});