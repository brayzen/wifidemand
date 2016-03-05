angular.module('LocationCtrl', [])
       .controller('LocationController', ['$scope', '$http', function($scope, $http) {
    $scope.formData = {};
    $scope.hideForm = true;
    $scope.townNames = [];
    //Populate selection box with location names\
    if (!localStorage.locations || localStorage.locations === "undefined"){
      $http.get('/api/location/names?all=true')
          .success(function(data){
              var arr = [];
              data.forEach(function(location){
                  arr.push(location.name);
              });
              localStorage.locations = arr;
              $scope.townNames = arr;
          }).error(function(status, data){
              console.log(status);
              console.log(data);
          });
    } else {
      $scope.townNames = localStorage.locations.split(',');
    }

    //Populate selected Location specific information
    $scope.getLocationData = function(target){
      var name = $('#location-selection').val();
      $scope.hideForm = false;
      console.log(name);
      $http.get('/api/location/' + name)
          .success(function(data){
            var newData = data["0"];
            console.log(newData);
            $scope.location = newData;
          }).error(function(status, data){
            console.error(data, status);
          });
    };

    //Submit form
    $scope.makeCustomer = function() {
      console.log($scope.formData);
      $scope.formData.locRef = $('#location-selection').val();
      console.log('submitting');
      // $http.post('/api/customer', $scope.formData)
      //      .success(function(data){
      //       console.log(data);
      //       console.info("disply success on screen");
      //       $scope.formHide = true;
      //       $scope.addLocBtn = true;
      //       $scope.formData = {};
      //      }).error(function(status, data){
      //       console.error(status);
      //       console.error(data);
      //      });
    };

    // ADMIN PAGE
    // ADMIN PAGE
    // ADMIN PAGE
    $scope.showTable = true;
    $scope.hideStats = true;
    $scope.hideIndexBtn = true;

    // this probably doesn't need to be attached to scope...just to run default when admin page is opened
    $scope.indexLocation = function(){
      $scope.locations = [];
      $http.get('/api/location/all/all')
           .success(function(data){
            console.info(data);
            $scope.locations = data;
           }).error(function(status, data){
            console.error(status);
            console.warn(data);
           })
    }
    $scope.indexLocation();

    $scope.showLocationStats = function(location){
      $scope.selected = $scope.locations[location];
      console.info($scope.selected)
      $scope.hideStats = false;
    }

    $scope.confirmDelete = function(location){
      if(confirm("Are you sure you want to delete this location?")){;
        $http.post('/api/location/delete/delete', location )
             .success(function(data){
              console.log(data);
              // displayMessage(data);
              var index = $scope.locations.indexOf( location )
              $scope.locations.splice(index, 1)
             }).error(function(status, data){
              console.error(status);
              console.warn(data);
             })
      }
    };
}]);
