angular.module('auth.control', ['equip.services'])
  .controller('AuthControl', function ($scope, Auth) {

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
      // console.log('HERE WE GO')
      console.log(data);
      Auth.signUp(data)
        .then(function (resp) {
          console.log(data);
          console.log('good post', resp);
        })
        .catch(function (err) {
          console.log('error', err);
        })

  	}
    $scope.signIn = function () {

    }


  })