angular.module('LoginCtrl', ['flash']).controller('LoginController', function($scope, $http, $window){
  $scope.formData = {};
  // $cookie.session = {};
  console.log('LOGIN CTRL');

  $scope.login = function(){
    console.log("BOOYA")
    $http.post('/login', $scope.formData)
         .then(function(res){
            console.info(res.data);
            $scope.formData = {};
            $window.localStorage.jwtWIFI = res.data.token;
            $scope.authed = true;
         }, function(data, status){
            console.error(data);
            console.error(status);
            // flash(status);
            // flash(data);
            // $scope.formData = {};
         });
  };
});
