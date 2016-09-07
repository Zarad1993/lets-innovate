angular.module('innovate.edit',[])
.controller('EditFeatureController', function($scope, $window, $location, Client, Features){

	var email = $location.path().substr(12,$location.path().length);
	var priority = $location.path().split('/');
	email = priority [priority.length-2];
	priority = priority[priority.length-1];
	$scope.feature = {};

	$scope.start = function(){
		Features.getOneFeature({email : email,priority : priority})
				.then(function(response){
					$scope.feature = response.data;
					$scope.feature.targetDate = new Date();
				})
				.catch(function(error){
					console.log(error);
				})
	};

	$scope.submitEdit = function(){
		Features.editFeature($scope.feature)
				.then(function(response){
					if(response.status == 201){
						if (Notification.permission === "granted") {
							// If it's okay let's create a notification
							spawnNotification('Your edit has been successfully submitted','http://payperhead.com/wp-content/uploads/2013/05/Features.jpg','Dear '+$scope.feature.client);
						}
						$location.path('/admin/home/'+email);
					}
				})
				.catch(function(error){
					console.log(error);
				});
				function spawnNotification(theBody,theIcon,theTitle) {
					var options = {
						body: theBody,
						icon: theIcon
					}
		    	    var n = new Notification(theTitle,options);
					setTimeout(n.close.bind(n), 3000);
				}
	}

})