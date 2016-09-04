angular.module('lets-innovate',[
	'innovate.home',
	'innovate.services',
	'innovate.auth',
	'ngRoute'
	])
.config(function($routeProvider, $httpProvider){
	$routeProvider
		.when('/',{
			templateUrl : 'js/templates/home.html',
			controller : 'HomeController'
		})
		.when('/signin',{
			templateUrl : 'js/templates/signin.html',
			controller : 'AuthController'
		})
})
.run(function($rootScope, $location, Client){
	OAuth.initialize('L47TybIQ1vyV7pZ-2OpJ5NNb3Qo');
	$rootScope.$on('$routeChangeStart', function (evt, next, current) {
		if(!Client.isAuth() && next.$$route){
			$location.path('/signin');
		}
	});	
})