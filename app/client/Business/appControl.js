// top level Equip controller
angular.module('equip.control', [])
  .controller('EquipControl', function ($scope) {
  	
    //fixture inventories
    $scope.inventories = {
      'bobsBoots': [{name: 'skis'}, {name: 'boots'}, {name: 'jacket'}]
    };

    //for use in toggling our inventory information when we are managing our inventory
    $scope.manageInUse = false;

    $scope.toggle = function () {
      $scope.manageInUse = !$scope.manageInUse;
    } 

  })