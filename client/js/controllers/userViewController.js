'use strict';
angular.module('innovate.user',[])
.controller('UserViewController',function($scope, $window, Features, $location){

	// This controller displays all the feature requests
	// that have already been submitted by the user-(Client)
	// Both admin and client get the same page rendered 
	// however the only difference is that the admin cannot edit a feature


	$scope.email = $location.path().substr(12,$location.path().length);
	$scope.features = []; // All features saved in an array
	$scope.sortType     = 'name'; // set the default sort type
	$scope.sortReverse  = false;  // set the default sort order
	$scope.flag = true; // Flag that displays the edit button

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

	if(!$window.localStorage.getItem('com.admin')){
		$("#sortable").sortable();
		$("#sortable").on( "sortupdate", function( event, ui ) {
			var split = event.target.outerText.split('\n');
			var array = [];
			split.forEach(function(i,index){

				array.push({
					before : i[0] ,
					after : index+1
				});
			});
			Features.updatePriorities({array : array, features : $scope.features})
					.then(function(response){
						if(response.status === 201){
							$scope.runUp();
						}
					})
		});
	}


});






