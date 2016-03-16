angular.module('LocationCtrl', ['flash'])
       .controller('LocationController', function($scope, $http, flash) {
          $scope.formData = {};
          $scope.hidePage = true;
          $scope.hideForm = true;
          $scope.locationName = {};
          $scope.showSuccess = false;


          //Populate selection box with location names
          $http.get('/api/location/get/names')
              .success(function(data){
                  console.log(data);
                  var arr = [];
                  data.forEach(function(location){
                      arr.push(location.name);
                  });
                  $scope.townNames = arr;
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
                  $scope.hidePage = false;
                  $scope.hideForm = false;
                  getCustomerTally(newData);
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
                  $scope.tally++;
                  $scope.formData = {};
                  $scope.hideForm = true;
                  $scope.showSuccess = true;
                 }).error(function(status, data){
                  console.error(status);
                  console.error(data);
                  flash('error', data);
                 });
          };

          function getCustomerTally(location) {
            var name = location.name;
            $http.get('/api/customer/tally/'+ name)
                 .then(function(res){
                  console.info('Successful call: tally = ' + res.data);
                  $scope.tally = res.data;
                 },function(data, status){
                  console.error(data);
                  console.error(status);
                  flash('error', data);
                 });
          }
      });
