// top level Equip controller
angular.module('equip.control', ['equip.services', 'auth.control', 'ngMaterial', 'main.control'])
  .controller('EquipControl', function ($scope, $location, Auth) {


    //determine our route when this controller is loaded - this will display the sign in page if the user is not signe in, and the main page if 
    if (!Auth.isAuthorized()) {
      $location.path('/signUp');
    } else {
      $location.path('/main')
    }
   
  })