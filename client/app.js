angular.module('lets-innovate',[
	'innovate.home',
	'ngRoute'
	])
.config(function($routeProvider, $httpProvider){
	$routeProvider
		.when('/',{
			templateUrl : 'js/templates/home.html',
			controller : 'HomeController'
		})
})