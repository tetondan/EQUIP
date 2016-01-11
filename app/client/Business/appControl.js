// top level Equip controller

angular.module('equip.control', ['equip.services', 'auth.control', 'ngMaterial', 'main.control'])
  .controller('EquipControl', function ($scope, $timeout,$log, $location, $mdSidenav, Auth) {

    //determine our route when this controller is loaded - this will display the sign in page if the user is not signe in, and the main page if 
    if (!Auth.isAuthorized()) {
      $location.path('/signUp');
    } else {
      $location.path('/main')
    }


    $scope.toggleLeft = buildDelayedToggler('left');

    //=======Below are functions used in the add item side menu=====
    /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
    function debounce(func, wait, context) {
      var timer;
      return function debounced() {
        var context = $scope,
            args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }
    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildDelayedToggler(navID) {
      return debounce(function() {
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }, 200);
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