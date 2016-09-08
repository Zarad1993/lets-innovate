'use strict';
angular.module('innovate.home',[])

.controller('HomeController', function($scope, Client, Features, $window, $location){	
	$scope.feature = {};



	$scope.startUp = function(){
		$scope.client = {};
		Client.checkClient({email:$window.localStorage.getItem('com.email')})
			  .then(function(response){
			  	$scope.client.name = response.data.name;
			  })
			  .catch(function(error){
			  	console.log(error);
			  });
	};
	$scope.logout = function(){
		Client.signout();
	};
	$scope.sendRequest = function(){
		// Display Notification
		function spawnNotification(theBody,theIcon,theTitle) {
			var options = {
				body: theBody,
				icon: theIcon
			};
    	    var n = new Notification(theTitle,options);
			setTimeout(n.close.bind(n), 3000);
		}
		Features.addFeature($scope.feature)
				.then(function(response){
					if(response.status === 201){
						setTimeout(function(){
							$window.location.reload();
						},1000);
						if (Notification.permission === 'granted') {
						// If it's okay let's create a notification
							spawnNotification('Thank You for submitting your Feature Request, It is very valuable for us and it will be taken into consideration upon the priority number','http://payperhead.com/wp-content/uploads/2013/05/Features.jpg','Dear '+$scope.client.name);
						}
					}
				})
				.catch(function(error){
					console.log(error);
				});
	};
	$scope.playSound = function(){   
	    document.getElementById('sound').innerHTML='<audio autoplay="autoplay"><source src="sounds/filling-your-inbox.mp3" type="audio/mpeg" /></audio>';
	};

	$scope.myTickets = function(){
		var data = $window.localStorage.getItem('com.email');
		$location.path('/admin/home/'+data);
	};
});