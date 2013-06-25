'use strict';

var praticeApp = angular.module('praticeApp', []);

praticeApp.controller('PageCtrl', function($scope) {
  $scope.genderData = [{
    gender: 'Male',
    value: 42,
  }, {
    gender: 'Female',
    value: 58
  }];

});

praticeApp.directive('chart', function() {
  return {
    restrict: 'A',
    scope: {
      d3Data: '='
    },
    template: '<div></div>',
    link: function(scope, element) {
      var data = scope.d3Data;
      var chart = d3.select(element[0]).append('svg')
        .attr('class', 'chart')
        .attr('width', 420)
        .attr('height', 20 * data.length);


      var maxValue = d3.max(data.map(function(d) {
        return d.value;
      }));

      var x = d3.scale.linear()
        .domain([0, maxValue])
        .range([0, 420]);

      chart.selectAll('rect')
        .data(data)
      .enter().append('rect')
        .attr('y', function(d, i) {
          return i * 20;
        })
        .attr('width', function(d, i) {
          return x(d.value);
        })
        .attr('height', 20);
    }
  };
});
