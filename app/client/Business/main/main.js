angular.module('main.control', ['equip.services', 'ngMaterial'])
  .controller('MainControl', function ($scope, Inventory,$state, $log, $timeout) {

    //this will transition us into the inventory view
    $state.transitionTo('main.inventory');
  })
  .config(function() {
    // $mdIconProvider
    //   .iconSet('communication', 'img/icons/sets/communication-icons.svg', 24);
  })