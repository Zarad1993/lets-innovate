angular.module('lets-innovate',[
	'innovate.home',
	'innovate.services',
	'ngRoute'
	])
.config(function($routeProvider, $httpProvider){
	$routeProvider
		.when('/',{
			templateUrl : 'js/templates/home.html',
			controller : 'HomeController'
		})
})