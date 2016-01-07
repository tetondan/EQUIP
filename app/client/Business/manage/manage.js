angular.module('inventory.manage', ['equip.service'])
	.controller('InventoryManage', function ($scope, $state, Inventory) {
    //our inventory holder
    $scope.selected = false;
 

    $scope.addTo = function () {

      //use function from equip.service to post to db
      
    }

    $scope.removeFrom = function () {
      //remove from inv
    }


  })

