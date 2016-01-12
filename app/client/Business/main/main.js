
angular.module('main.control', ['equip.services', 'ngMaterial', 'equip.services'])
  .controller('MainControl', function ($scope, Inventory, $state, $mdSidenav, $log, $timeout, Auth, Messages, $interval) {

    //this will transition us into the inventory view if authorized
    if (Auth.isAuthorized()) {
      $state.transitionTo('main.inventory');
    } else {
      $state.transitionTo('signUp');
    }

    //initializing our inventory
    Inventory.getItems(window.localStorage.EQUIP_TOKEN)
      .then(function (data) {
        $scope.inventory = data.data;
      })

    //initializing our message feed
    $interval(function () {
      Messages.getMessages(window.localStorage.EQUIP_TOKEN)
        .then(function (messages) {
         $scope.messages =  messages.data.map(function (message) {
            message.dates = message.dates.map(function (date) {
              return moment(date).calendar();
            })
            return message;
          })
        });
    }, 1000)

    //sticking point:  although it seems like it should be in the Inventory module/controller - this add to function needs to be here in main so that we maintain scope access
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
  //this controller is associated with opening and closing the add item side nav
  .controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      $mdSidenav('left').close()
        .then(function () {
          $log.debug("close LEFT is done");
        });
    };
  })

