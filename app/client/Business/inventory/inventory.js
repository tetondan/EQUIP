angular.module('inventory.control', ['equip.services', 'ngMaterial'])
  .controller('InventoryControl', function ($scope, Inventory) {

    $scope.remove = function (id, $index) {
      console.log($index)
      Inventory.removeItem(id)
        .then(function (response) {
          console.log('removed', response);
        })
      $scope.inventory.splice($index, 1);
      Inventory.update();
    }

    

  })