'use strict';
angular.module('lets-innovate',[
	'innovate.home',
	'innovate.services',
	'innovate.auth',
	'innovate.admin',
	'innovate.edit',
	'innovate.user',
	'ngRoute',
	'ui'
	])
.config(function($routeProvider){
	$routeProvider
		.when('/',{
			cache : false,
			templateUrl : 'js/templates/home.html',
			controller : 'HomeController'
		})
		.when('/signin',{
			cache : false,
			templateUrl : 'js/templates/signin.html',
			controller : 'AuthController'
		})
		.when('/admin',{
			cache : false,
			templateUrl : 'js/templates/adminLogin.html',
			controller: 'AdminController'
		})
		.when('/admin/home',{
			cache : false,
			templateUrl : 'js/templates/adminHome.html',
			controller : 'AdminController'
		})
		.when('/admin/home/:email',{
			cache : false, 
			templateUrl : 'js/templates/userDetails.html',
			controller : 'UserViewController'
		})
		.when('/edit/:email/:priority',{
			cache : false, 
			templateUrl : 'js/templates/editFeature.html',
			controller : 'EditFeatureController'
		})
	    .otherwise({
    	  redirectTo: '/'
    	});
})
.run(function($rootScope, $location, Client, $window){
	OAuth.initialize('L47TybIQ1vyV7pZ-2OpJ5NNb3Qo');
	function notifyMe() {
		// Let's check if the browser supports notifications
		if (!('Notification' in window)) {
			window.alert('This browser does not support desktop notification');
		}

		// Let's check whether notification permissions have already been granted
		
		// Otherwise, we need to ask the user for permission
		else if (Notification.permission !== 'denied') {
			Notification.requestPermission(function (permission) {
			  // If the user accepts, let's create a notification
			  if (permission === 'granted') {
			    new Notification('Thank you');
			  }
			});
		}
	}
	notifyMe();
	$rootScope.$on('$routeChangeStart', function (evt, next) {
		if(!Client.isAuth() && next.$$route.originalPath !== '/admin'){
			$location.path('/signin');
		} else if($window.localStorage.getItem('com.email') && $window.localStorage.getItem('com.admin')){
			window.alert('Both Are in');
			Client.signout();
		} else if($window.localStorage.getItem('com.client') && next.$$route.originalPath === '/admin/home'){
			window.alert('There is no such access');
			$location.path('/');
		} else if($window.localStorage.getItem('com.admin') && next.$$route.originalPath === '/'){
			window.alert('Sorry Admin, You cannot be here');
			$location.path('/admin/home');
		} 
	});	
});