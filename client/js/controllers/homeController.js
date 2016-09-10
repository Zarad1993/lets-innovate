'use strict';
angular.module('innovate.home',[])

.controller('HomeController', function($scope, Client, Features, $window, $location){	
	$scope.feature = {};
	// This is our Home Controller 
	// Which is the heart of the application, where the user submits
	// a new feature request


	// When calling the controller, we get the name and email of the 
	// user using the application 
	$scope.startUp = function(){
		$scope.client = {};
		$scope.numberOfFeatures = 0;
		Client.checkClient({email:$window.localStorage.getItem('com.email')})
			  .then(function(response){
			  	$scope.client.name = response.data.name;
			  })
			  .catch(function(error){
			  	console.log(error);
			  });

		Features.getByEmail($window.localStorage.getItem('com.email'))
			    .then(function(response){
			    	$scope.numberOfFeatures = response.data.length;
			    })
			    .catch(function(error){
			    	console.log(error);
			    })  
	};

	// Submit a new feature request 
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

		$scope.feature.clientPriority = $scope.numberOfFeatures + 1;
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
					} else {
							// If not, then display an error message
							spawnNotification('Error!\nPlease Change the Priority Number to procceed','http://payperhead.com/wp-content/uploads/2013/05/Features.jpg','Dear '+$scope.client.name);
					}
				})
				.catch(function(error){
					console.log(error);
				});
	};

	// Small tweak to display a notification sound
	$scope.playSound = function(){   
	    document.getElementById('sound').innerHTML='<audio autoplay="autoplay"><source src="sounds/filling-your-inbox.mp3" type="audio/mpeg" /></audio>';
	};

	// Take me to a page the displays all my tickets and feature requests
	$scope.myTickets = function(){
		var data = $window.localStorage.getItem('com.email');
		$location.path('/admin/home/'+data);
	};
});