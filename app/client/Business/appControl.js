// top level Equip controller
angular.module('equip.control', ['equip.services'])
  .controller('EquipControl', function ($scope, $location, Auth) {
  	
    //fixture inventories
    $scope.inventory = {
      'bobsBoots': [{name: 'skis'}, {name: 'boots'}, {name: 'jacket'}]
    };  


    //determine our route when this controller is loaded - this will display the sign in page if the user is not signe in, and the main page if 
    if (!Auth.isAuthorized()) {
      $location.path('/signUp');
    } else {
      $location.path('/main')
    }

    //for use in toggling our inventory information when we are managing our inventory
    $scope.manageInUse = false;

    $scope.toggle = function () {
      $scope.manageInUse = !$scope.manageInUse;
    } 

  })