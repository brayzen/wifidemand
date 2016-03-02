angular.module('LocationCtrl', [])
       .controller('LocationController', ['$scope', '$http', function($scope, $http) {
    $('#spec-form').hide();
    //Populate selection box with location names\
    if (!localStorage.locations || localStorage.locations === "undefined"){
      $http.get('/api/location/names?all=true')
          .success(function(data){
              var arr = [];
              data.forEach(function(location){
                  arr.push(location.name);
              });
              localStorage.locations = arr;
              return $scope.townNames = arr;
          }).error(function(status, data){
              console.log(status);
              console.log(data);
          });
    } else {
      $scope.townNames = localStorage.locations.split(',');
    }

    //Populate selected Location specific information
    $('#location-selection').on('change', function(){
      $('#spec-form').show();
      $http.get('/api/location/' + this.value)
          .success(function(data){
            var newData = data["0"];
            $scope.location = newData;
          }).error(function(status, data){
            console.error(data, status);
          });
    });

    //Submit form
    $('#submit-customer').on('click', function(){
      var form = $('form')[0];
      console.log(form);
      var formData = new FormData(form);
      formData.append('firstName', $('#customer-first-name'));
      formData.append('lastName', $('#customer-last-name'));
      formData.append('email', $('#customer-email'));
      formData.append('address', $('#customer-address'));
      formData.append('city', $('#customer-city'));
      formData.append('phone', $('#customer-phone'));
      formData.append('zip', $('#customer-zip'));
      formData.append('option', $('#customer-option'));
      console.log(formData);
      $http.post('/api/customer', formData)
           .success(function(data){
            console.info(data);
           }).error(function(status, data){
            console.error(status);
            console.error(data);
           });
    })
}]);
