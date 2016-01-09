angular.module('auth.control', ['equip.services'])
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
          $location.path('/signIn');
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