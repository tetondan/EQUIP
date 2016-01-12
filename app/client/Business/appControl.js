// top level Equip controller

angular.module('equip.control', ['equip.services', 'auth.control', 'ngMaterial', 'main.control'])
  .controller('EquipControl', function ($scope, $timeout,$log, $location, $mdSidenav, Auth, $state) {

    $scope.aab = 'Equip';

    //determine our route when this controller is loaded - this will display the sign in page if the user is not signe in, and the main page otherwise
    if (!Auth.isAuthorized()) {
      $location.path('/signUp');
    } else {
      $location.path('/main')
    }

    //the logout function will handle logging us out and taking us back to the sign up page
    $scope.logout = function () {
      Auth.logout();
      $state.transitionTo('signUp');
    }

    $scope.login = function () {
      $state.transitionTo('signIn');
    }


    //=======UI Side Nav components/functions=====

    $scope.toggleLeft = buildDelayedToggler('left');
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