angular.module('LoginCtrl', ['flash']).controller('LoginController', function($scope, $http, $window, flash){
  $scope.formData = {};
  console.log('LOGIN CTRL');

  $scope.login = function(){
    $http.post('/login', $scope.formData)
         .then(function(res){
            console.info(res.data);
            $window.localStorage.jwtWIFI = res.data.token;
            $scope.authed = true;
            $scope.formData = {};
         }, function(data, status){
            console.error(data);
            console.error(data.status);
            flash(data.statusText);
            flash(data.status);
         });
  };
});
