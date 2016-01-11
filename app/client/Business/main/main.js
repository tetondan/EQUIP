
angular.module('main.control', ['equip.services', 'ngMaterial', 'equip.services'])
  .controller('MainControl', function ($scope, Inventory, $state, $mdSidenav, $log, $timeout, Messages) {

    //this will transition us into the inventory view
    $state.transitionTo('main.inventory');

    Messages.getMessages()
      .then(function (messages) {
        $scope.messages = messages.data;
      });

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
  .controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      $mdSidenav('left').close()
        .then(function () {
          $log.debug("close LEFT is done");
        });
    };
  })

  .config(function() {
    // $mdIconProvider
    //   .iconSet('communication', 'img/icons/sets/communication-icons.svg', 24);
  })

