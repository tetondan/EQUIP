angular.module('auth.control', ['equip.services', 'ngMaterial'])
  .controller('AuthControl', function ($scope, $location, Auth) {

  	$scope.signedIn = false;

  	$scope.signUp = function () {	
      var data = {
        username: $scope.username,
        password: $scope.password,
        name: $scope.busName,
        email: $scope.email,
        website: $scope.website,
        address: $scope.address,
        phone: $scope.phone
      }

      Auth.signUp(data)
        .then(function (data) {
          $location.path('/main');
          console.log('good post', data);
        })
        .catch(function (err) {
          console.log('error', err);
        })
  	}

    $scope.signIn = function () {

      Auth.signIn($scope.username, $scope.password);

    }

  })
  .config(function($mdThemingProvider) {
    // Configure a dark theme with primary foreground yellow
    $mdThemingProvider.theme('docs-dark', 'default')
      .primaryPalette('yellow')
      .dark();
  });