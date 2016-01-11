
angular.module('main.control', ['equip.services', 'ngMaterial', 'equip.services'])
  .controller('MainControl', function ($scope, Inventory, $state, $mdSidenav, $log, $timeout, Auth, Messages) {

    //this will transition us into the inventory view if authorized
    if (Auth.isAuthorized()) {
      $state.transitionTo('main.inventory');
    } else {
      $state.transitionTo('signUp');
    }

    Inventory.getItems(window.localStorage.EQUIP_TOKEN)
      .then(function (data) {
        $scope.inventory = data.data;
        console.log($scope.inventory);
      })


    Messages.getMessages(window.localStorage.EQUIP_TOKEN)
      .then(function (messages) {
        console.log(messages);
        $scope.messages = messages.data;
      });

    //this needs to stay in main because the view side menu add item bar is in main's scope
    $scope.addTo = function () {
      var itemData = {
        item: $scope.item,
        price: $scope.price,
        desc: $scope.desc,
        amt: $scope.amt,
        isIn: $scope.isIn,
        img: $scope.img,
        dates: $scope.dates,
        businessId: window.localStorage.EQUIP_TOKEN
      }
      Inventory.addItem(itemData)
        .then(function (response) {
          console.log('good POST', response);
          $scope.inventory.push(itemData);
          Inventory.update();
          return response;
        })
        //quick and dirty form reset
        $scope.item = '';
        $scope.price = '';
        $scope.desc = '';
        $scope.amt = '';
        $scope.isIn = '';
        $scope.img = '';
        $scope.dates = '';
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

