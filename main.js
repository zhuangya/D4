var praticeApp = angular.module('praticeApp', []);

praticeApp.directive('chart', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/chart.html',
    link: function(scope, element, attrs) {
      console.log(attrs);
    }
  };
});

praticeApp.controller('PageCtrl', function($scope) {
  $scope.msg = 'hello from AngularJS';
});

