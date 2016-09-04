angular.module('innovate.auth',[])
.controller('AuthController', function($scope,$location,$window){
	OAuth.popup('facebook')
	.done(function(result) {
	  //use result.access_token in your API request 
	  //or use result.get|post|put|del|patch|me methods (see below)
	  console.log(result);
	})
	.fail(function (err) {
		console.log(err)
	  //handle error with err
	});
})