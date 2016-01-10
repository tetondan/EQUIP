angular.module('inventory.control', ['equip.services'])
  .controller('InventoryControl', function ($scope, Inventory) {

  	Inventory.getItems()
  	  .then(function (data) {
        $scope.inventory = data.data;
        console.log($scope.inventory);
      })
    
  })