angular.module('innovate.services',[])

.factory('Client', function($window, $http, $location){

    var isAuth = function () {
        return !!$window.localStorage.getItem('com.innov');
	};

	var signout = function () {
	    localStorage.clear();
	    $window.localStorage.clear();
	    $location.path('/signin');
	};

	var checkClient = function(name){
		return $http({
			method : 'POST',
			url : '/api/innov/client',
			data : name
		})
		.then(function(response){
			return response;
		})
		.catch(function(error){
			return error;
		});
	}

	var getClients = function(){
		return $http({
			method : 'GET',
			url : '/api/innov/clients'
		})
		.then(function(response){
			return response;
		})
		.catch(function(error){
			return error;
		});
	};
	return{
		isAuth : isAuth,
		signout : signout,
		checkClient: checkClient,
		getClients : getClients
	}
})
.factory('Features', function($window,$http){
	var getFeatures = function(){
		return $http({
			method : 'GET',
			url : '/api/innov/features'
		})
		.then(function(response){
			return response;
		})
		.catch(function(error){
			return error;
		})
	};

	var addFeature = function(data){
		return $http({
			method : 'POST' ,
			url : '/api/innov/add',
			data : data
		})
		.then(function(response){
			return response;
		})
		.catch(function(error){
			return error;
		});
	};

	return {
		getFeatures : getFeatures,
		addFeature : addFeature
	}
})
.factory('Admin', function($window,$http){
	var signin = function(data){
		return $http({
			method : 'POST' , 
			url : '/api/innov/signin',
			data : data
		})
		.then(function(response){
			return response;
		})
		.catch(function(error){
			return error;
		});
	}
	return {
		signin : signin
	}
})