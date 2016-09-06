angular.module('innovate.auth',[])
.controller('AuthController', function($scope, $location, $window, Client){
	$scope.checkUser = function(){
		if(Client.isAuth()){
			alert('You Are Already Logged In');
			$location.path('/');
		}
	}

	$scope.signWithAuth = function(provider){
		OAuth.popup(provider)
		.then(function(result) {
			$window.localStorage.setItem('com.innov', result.access_token);
		  result.me().then(function(data){
		  	$scope.addClient(data);
		  })
		})
		.fail(function (err) {
			console.log(err)
		});				
	};

	$scope.addClient = function(data){
		Client.checkClient({name : data.name, email : data.email})
			  .then(function(response){
			  	console.log(response);
				setTimeout(function(){
					$window.localStorage.setItem('com.email',data.email);
					$window.localStorage.setItem('com.client',true);
					$location.path('/');
					$scope.$apply();
				},250);
			  })
			  .catch(function(error){
			  	console.log(error);
			  })
	}

		
})