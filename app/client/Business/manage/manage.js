angular.module('inventory.manage', ['equip.services'])
	.controller('InventoryManage', function ($scope, $state, Inventory) {
    //our inventory holder
    $scope.selected = false;
 
    $scope.addTo = function () {
      var itemData = {
        item: $scope.item,
        price: $scope.price,
        desc: $scope.desc,
        amt: $scope.amt,
        isIn: $scope.isIn,
        img: $scope.img,
        dates: $scope.dates
      }
      Inventory.addItem(itemData)
        .then(function (response) {
          console.log('good POST', response);
          return response;
        })
      //use function from equip.service to post to db
    }

    $scope.removeFrom = function () {
      //remove from inv
    }


  })

