angular.module('MainCtrl', []).controller('MainController', function($scope, LocationFactory) {
    // localStorage.locations = LocationFactory.get();
    $scope.tagline = 'To the moon and back!';

});
