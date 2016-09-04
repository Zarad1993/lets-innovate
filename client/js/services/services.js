angular.module('innovate.services',[])

.factory('Client', function($window, $http){
	var signin = function(data){
		return $http({
			method : 'POST',
			url : '/api/innov/signin',
			data : data
		})
		.then(function(response){
			return response;
		})
		.catch(function(error){
			return error;
		})
	};

	var signup = function(data){
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
	};


    var isAuth = function () {
        return !!$window.localStorage.getItem('com.innov');
	};

	var signout = function () {
	    localStorage.clear();
	    $window.localStorage.clear();
	    $location.path('/');
	};


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
		signin : signin,
		signup : signup,
		isAuth : isAuth,
		signout : signout,
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