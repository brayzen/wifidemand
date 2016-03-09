angular.module('Directives', [])
  .directive('locationStats', function(){
    return {
      restrict: 'AE',
      transclude: true,
      templateUrl: "../views/templates/location-stats.html"
      // controller: 'AdminController',
    };
  })

  .directive('customerTable', function(){
    return {
      restrict: 'AE',
      transclude: true,
      templateUrl: "../views/templates/customer-table.html"
    }
  })

  .directive('addLocation', function(){
    return {
      restrict: 'E',
      transclude: false,
      templateUrl: "../views/templates/add-location.html"
    }
  })
