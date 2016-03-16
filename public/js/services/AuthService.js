angular.module('AuthService', []).service('Auth', function($scope, $http, $window) {

    this.getToken = function(){
      return $window.localStorage.jwtWIFI;
    }

        //AUTH
    this.parseJwt = function(token){
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse($window.atob(base64));
    }

    //AUTH
    this.isAuthed = function(){
      var token = getToken();
      if(token) {
        var params = parseJwt(token);
        var answer = Math.round(new Date().getTime() / 1000) <= params.exp;
        $scope.authed = answer;
        return answer;
      } else {
        $scope.authed = false;
        return false;
      }
    }

});
