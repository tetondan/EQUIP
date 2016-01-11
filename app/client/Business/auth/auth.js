angular.module('auth.control', ['equip.services', 'ngMaterial'])
  .controller('AuthControl', function ($scope, $location, Auth) {


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
      console.log('signing in', $scope.username, $scope.password);
      Auth.signIn($scope.username, $scope.password)
      .then(function (data) {
        console.log($scope.user)
        $scope.aab = 'hello'
        console.log($scope.user)
        window.localStorage.setItem('EQUIP_TOKEN', data.data.id);
        $location.path('/main');
      });

    }

  })
  .config(function($mdThemingProvider) {
    // Configure a dark theme with primary foreground yellow
    $mdThemingProvider.theme('docs-dark', 'default')
      .primaryPalette('yellow')
      .dark();
  });