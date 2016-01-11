angular.module('inventory.control', ['equip.services', 'ngMaterial'])
  .controller('InventoryControl', function ($scope, Inventory) {

  	Inventory.getItems()
  	  .then(function (data) {
        $scope.inventory = data.data;
        console.log($scope.inventory);
      })

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
      console.log('HOWDY PARTNER')
      Inventory.addItem(itemData)
        .then(function (response) {
          console.log('good POST', response);
          return response;
        })
    }
    
  })