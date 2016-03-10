angular.module('LocationCtrl', [])
       .controller('LocationController', ['$scope', '$http', function($scope, $http) {
    $scope.formData = {};
    $scope.hideForm = true;
    $scope.locationName = {};

    //Populate selection box with location names\
    $http.get('/api/location/get/names')
        .success(function(data){
            var arr = [];
            data.forEach(function(location){
                arr.push(location.name);
            });
            $scope.townNames = arr;
            console.log($scope.townNames);
            // timeSetter();
        }).error(function(status, data){
            console.log(status);
            console.log(data);
        });

    //Populate Selected with location specific information
    $scope.getLocationData = function(){
      name = $scope.selection1;

      $http.get('/api/location/' + name)
          .success(function(data){
            var newData = data["0"];
            console.log(newData);
            $scope.location = newData;
            $scope.hideForm = false;
            getCustomerTally(newData);
            console.warn($scope.tally);
          }).error(function(status, data){
            console.error(data, status);
          });
    };

    //Submit form
    $scope.makeCustomer = function( ) {
      var formData = $scope.formData;
      formData.locRef = $('#location-selection').val();
      console.log('submitting');

      $http.post('/api/customer', formData)
           .success(function(data){
            console.log(data);
            console.info("disply success on screen");
            $scope.formHide = true;
            $scope.addLocBtn = true;
            $scope.formData = {};
           }).error(function(status, data){
            console.error(status);
            console.error(data);
           });
    };

    function getCustomerTally(location) {
      var location = location.name;
      $http.get('/api/customer/tally/'+ location)
           .then(function(res){
            console.info('Successful call: tally = ' + res.data);
            $scope.tally = res.data;
           },function(data, status){
            console.error(data);
            console.error(status);
           })
    }
}]);
