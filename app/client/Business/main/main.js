angular.module('main.control', ['equip.services', 'ngMaterial'])
  .controller('MainControl', function ($scope, Messages, Inventory,$state, $log, $timeout) {

    //this will transition us into the inventory view
    $state.transitionTo('main.inventory');

    //populate our messages sidebar
    Messages.getMessages()
      .then(function (messages) {
        $scope.messages = messages.data;
      });

  })
  .config(function() {
    // $mdIconProvider
    //   .iconSet('communication', 'img/icons/sets/communication-icons.svg', 24);
  })