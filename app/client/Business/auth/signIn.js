angular.module('auth.control', [])
  .controller('AuthControl', function ($scope) {

  	$scope.signedIn = false;


  	$scope.signIn = function () {

  	}
  	$scope.signUp = function () {
  		
  	}
  	$scope.toggleAuth = function () {
  		$scope.signedIn = !$scope.signedIn;
  	}

  })