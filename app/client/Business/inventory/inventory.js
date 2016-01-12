angular.module('inventory.control', ['equip.services', 'ngMaterial'])
  .controller('InventoryControl', function ($scope, Inventory) {
    
    //this will remove an item from the inventory and re render the view
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