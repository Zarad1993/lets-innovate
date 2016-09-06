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
			  })	
	}
	$scope.logout = function(){
		Client.signout();
	}
	$scope.sendRequest = function(){
		Features.addFeature($scope.feature)
				.then(function(response){
					$window.location.reload();
					notifyMe();
				})
				.catch(function(error){
					console.log(error);
				});
				// Display Notification
				function spawnNotification(theBody,theIcon,theTitle) {
					var options = {
						body: theBody,
						icon: theIcon
					}
		    	    var n = new Notification(theTitle,options);
					setTimeout(n.close.bind(n), 3000);
				}
				// Get Request for Notification
				function notifyMe() {
					// Let's check if the browser supports notifications
					if (!("Notification" in window)) {
						alert("This browser does not support desktop notification");
					}

					// Let's check whether notification permissions have already been granted
					else if (Notification.permission === "granted") {
					// If it's okay let's create a notification
						spawnNotification('Thank You for submitting your Feature Request, It is very valuable for us and it will be taken into consideration upon the priority number','http://payperhead.com/wp-content/uploads/2013/05/Features.jpg','Dear '+$scope.client.name);
					}

					// Otherwise, we need to ask the user for permission
					else if (Notification.permission !== 'denied') {
					Notification.requestPermission(function (permission) {
					  // If the user accepts, let's create a notification
					  if (permission === "granted") {
					  		spawnNotification('Thank You for submitting your Feature Request, It is very valuable for us and it will be taken into consideration upon the priority number','http://payperhead.com/wp-content/uploads/2013/05/Features.jpg','Dear '+$scope.client.name);
					  }
					});
}

				  // At last, if the user has denied notifications, and you 
				  // want to be respectful there is no need to bother them any more.
				}				

	};

	$scope.myTickets = function(email){
		var data = $window.localStorage.getItem('com.email')
		$location.path('/admin/home/'+data);
	}
})