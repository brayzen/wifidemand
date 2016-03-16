angular.module('MainCtrl', []).controller('MainController', function($scope) {
    $scope.tagline = 'To the moon and back!';

    function getToken(){
      return $window.localStorage.jwtWIFI;
    }

        //AUTH
    function parseJwt(token) {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse($window.atob(base64));
    }

    //AUTH
    function isAuthed(){
      var token = $scope.getToken();
      if(token) {
        var params = parseJwt(token);
        return Math.round(new Date().getTime() / 1000) <= params.exp;
      } else {
        return false;
      }
    }
});
