angular.module('ui.dropdown', []).controller('DropdownCtrl', function ($scope, $log) {
  $scope.items = [
    'Character Match', 
    'Word Match'
  ];

  $scope.status = {
    isopen: false
  };

  $scope.click = function (val) {
    console.log(val)
  }

  $scope.toggled = function(open) {
    $log.log('Dropdown is now: ', open);
    console.log($scope.choice)
  };

  $scope.toggleDropdown = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.status.isopen = !$scope.status.isopen;
    console.log($event)
  };

});