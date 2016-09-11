angular.module('innovate.features',[])
.controller('AllFeatureController', function($scope, Features, $location, $window, Client, socket){
	Features.getFeatures()
			.then(function(response){
				$scope.features = response.data;
			})
			.catch(function(error){
				console.log(error);
			})


	$scope.logout = function(){
		Client.signout();
	};

	$scope.playSound = function(){   
	    document.getElementById('sound').innerHTML='<audio autoplay="autoplay"><source src="sounds/filling-your-inbox.mp3" type="audio/mpeg" /></audio>';
	};



	socket.on('reload', function(data){
		// Display Notification
		function spawnNotification(theBody,theIcon,theTitle) {
			var options = {
				body: theBody,
				icon: theIcon
			};
    	    var n = new Notification(theTitle,options);
			setTimeout(n.close.bind(n), 3000);
		}

		Features.getFeatures()
				.then(function(response){
					if(response.status === 200){
						$scope.playSound();
						$scope.features = response.data;
						spawnNotification(data + ' have updated his priorities','http://payperhead.com/wp-content/uploads/2013/05/Features.jpg','Dear Admin');
					}
		})
	});
})