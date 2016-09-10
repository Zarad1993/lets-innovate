'use strict';
angular.module('innovate.user',[])
.controller('UserViewController',function($scope, $window, Features, $location, Client){

	// This controller displays all the feature requests
	// that have already been submitted by the user-(Client)
	// Both admin and client get the same page rendered 
	// however the only difference is that the admin cannot edit a feature


	$scope.email = $location.path().substr(12,$location.path().length);
	$scope.features = []; // All features saved in an array
	$scope.sortType     = 'name'; // set the default sort type
	$scope.sortReverse  = false;  // set the default sort order
	$scope.flag = true; // Flag that displays the edit button
	$scope.bet = false; // A condition that displays the go Back button for admin

	// On calling the controller 
	// runUp is our initialize function
	// That gets all the features of the given email
	$scope.runUp = function(){
		Features.getByEmail($scope.email)
			  .then(function(response){
			  	// If client has features then display
			  	if(response.data.length > 0){
				  	$scope.features = response.data;
				  	for(var i = 0; i < $scope.features.length; i++){
				  		$scope.features[i].targetDate = $scope.features[i].targetDate.substr(0,$scope.features[i].targetDate.indexOf('T'));
				  	}
			  	} else { 
			  		// If not then, return to the homepage
			  		// Weather admin or client
			  		if($window.localStorage.getItem('com.admin')){
			  			$location.path('/admin/home');
			  		} else {
			  			$location.path('/');
			  		}
			  		window.alert('This client has no more feature Requests');
			  	}

			  });
		// If the user is admin, then don't display edit button
		if($window.localStorage.getItem('com.admin')){
			$scope.flag = false;
			$scope.bet = true;
		}


	};

	// A delete function for the admin and client, upon ending the feature request
	$scope.delete = function(priority,client){
		var getConfirm = window.confirm('Are you sure you want to delete this feature ?');
		if(getConfirm){
			Features.deleteFeature({priority : priority , client : client})
					.then(function(response){
						if(response.status === 201){
							$window.location.reload();
						}
					});
		}
	};

	// Go back function that returns home 
	$scope.goBack = function(){
		if($window.localStorage.getItem('com.admin')){
			$location.path('/admin/home');
		} else {
			$location.path('/');
		}
	};

	// Edit function that takes us to the edit page and controller
	$scope.edit = function(number){
		$location.path('/edit/'+$scope.email+'/'+number);
	};
	function spawnNotification(theBody,theIcon,theTitle) {
		var options = {
			body: theBody,
			icon: theIcon
		};
	    var n = new Notification(theTitle,options);
		setTimeout(n.close.bind(n), 3000);
	}	

	if(!$window.localStorage.getItem('com.admin')){
		$("#sortable").sortable();
		$("#sortable").on( "sortupdate", function( event, ui ) {
			var split = event.target.outerText.split('\n');			
			var array = [];			
			var updateArray = function(numbers,index){
					array.push({
						before : numbers ,
						after : index+1
					});
			}
			split.forEach(function(i,index){
				if(split.length > 9){
					updateArray(i[0]+i[1], index);
				} else {
					updateArray(i[0], index);
				}
			});
			Features.updatePriorities({array : array, features : $scope.features})
					.then(function(response){
						if(response.status === 201){
							$scope.playSound();
							spawnNotification('Thank you for re-ordering your priorities','http://payperhead.com/wp-content/uploads/2013/05/Features.jpg','REORDER\nDear '+$scope.features[0].client);
							$scope.runUp();
						}
					})
		});
	}

	$scope.playSound = function(){   
	    document.getElementById('sound').innerHTML='<audio autoplay="autoplay"><source src="sounds/filling-your-inbox.mp3" type="audio/mpeg" /></audio>';
	};

	// Logout function
	$scope.logout = function(){
		Client.signout();
	};

	$scope.$watch('features',function(model){
		model.forEach(function(i,index){
			i.clientPriority = index +1;
			Features.editFeature(i);
		})
	})

});






