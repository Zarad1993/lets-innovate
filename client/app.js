angular.module('lets-innovate',[
	'innovate.home',
	'innovate.services',
	'innovate.auth',
	'innovate.admin',
	'ngRoute'
	])
.config(function($routeProvider, $httpProvider){
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
	    .otherwise({
    	  redirectTo: '/'
    	});
})
.run(function($rootScope, $location, Client){
	OAuth.initialize('L47TybIQ1vyV7pZ-2OpJ5NNb3Qo');
	$rootScope.$on('$routeChangeStart', function (evt, next, current) {
		if(!Client.isAuth() && next.$$route.originalPath !== '/admin'){
			$location.path('/signin');
		}
	});	
})