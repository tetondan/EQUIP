angular.module('main.control', ['equip.services'])
  .controller('MainControl', function ($scope, Inventory,$state) {
    
    //this will transition us into the inventory view
    $state.transitionTo('main.inventory');
  })
  .config(function() {
    // $mdIconProvider
    //   .iconSet('communication', 'img/icons/sets/communication-icons.svg', 24);
  })