'use strict';
angular.module('innovate.edit',[])
.controller('EditFeatureController', function($scope, $window, $location, Client, Features, socket){

	// This is the Edit Controller where only the User-(CLIENT) is allowed
	// to edit (Update) his feature request


	// Get the email from the path
	var email = $location.path().substr(12,$location.path().length);
	// Get priority from path
	var priority = $location.path().split('/');
	email = priority [priority.length-2];
	priority = priority[priority.length-1];
	$scope.feature = {};

	// on Running the controller
	// We call the feature our user clicked on 
	$scope.start = function(){
		Features.getOneFeature({email : email,priority : priority})
				.then(function(response){
					$scope.feature = response.data; // feature data rendered on DOM 
					$scope.feature.targetDate = new Date();
				})
				.catch(function(error){
					console.log(error);
				});
	};


	// Upon finishing then pass a notification by success 
	// and save data in database
	$scope.submitEdit = function(){
		function spawnNotification(theBody,theIcon,theTitle) {
			var options = {
				body: theBody,
				icon: theIcon
			};
    	    var n = new Notification(theTitle,options);
			setTimeout(n.close.bind(n), 3000);
		}
		Features.editFeature($scope.feature)
				.then(function(response){
					if(response.status === 201){
						socket.emit('update priority',$scope.feature.client);
						if (Notification.permission === 'granted') {
							// If it's okay let's create a notification
							spawnNotification('Your edit has been successfully submitted','http://payperhead.com/wp-content/uploads/2013/05/Features.jpg','Dear '+$scope.feature.client);
						}
						setTimeout(function(){
							$location.path('/admin/home/'+email);
							$scope.$apply();
						},1000);
						
					}
				})
				.catch(function(error){
					console.log(error);
				});
	};

	// This is a simple tweak that plays a small notification sound
	$scope.playSound = function(){   
	    document.getElementById('sound').innerHTML='<audio autoplay="autoplay"><source src="sounds/filling-your-inbox.mp3" type="audio/mpeg" /></audio>';
	};
});