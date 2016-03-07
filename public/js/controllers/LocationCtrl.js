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

    // ADMIN PAGE
    // ADMIN PAGE
    // ADMIN PAGE
    // $scope.showTable = true;
    // $scope.hideStats = true;
    // $scope.hideIndexBtn = true;
    // $scope.hideCustomers = true;

    // // this probably doesn't need to be attached to scope...just to run default when admin page is opened
    // $scope.indexLocation = function(){
    //   $scope.locations = [];

    //   $http.get('/api/location/all/all')
    //        .success(function(data){
    //         // console.info(data);
    //         $scope.locations = data;
    //        }).error(function(status, data){
    //         console.error(status);
    //         console.warn(data);
    //        });
    // };
    // $scope.indexLocation();

    // $scope.showLocationStats = function(location){
    //   $scope.selected = location;
    //   console.info($scope.selected);
    //   $scope.hideStats = false;
    //   $scope.showTable = false;
    //   $scope.hideIndexBtn = false;
    //   getCustomers(location);
    // };

    // $scope.confirmDelete = function(location){
    //   if (confirm("Are you sure you want to delete this location?")) {
    //     $http.post('/api/location/delete/delete', location )
    //          .success(function(data){
    //           console.log(data);
    //           // displayMessage(data);
    //           var index = $scope.locations.indexOf( location );
    //           $scope.locations.splice(index, 1);
    //          }).error(function(data, status){
    //           console.error(status);
    //           console.warn(data);
    //          });
    //   }
    // };

    // function getCustomers(location) {
    //   console.log('getting all customers');
    //   var locationName = location.name;

    //   $http.get('/api/customer/' + locationName + '/all')
    //        .success(function(data){
    //         console.log("success: " + data);
    //         console.info(data);
    //         tallyOptions(data);
    //         $scope.selected.customers = data;
    //        }).error(function(data, status){
    //         console.error(status);
    //         console.error(data);
    //        });
    // }

    // function tallyOptions(customerArr){
    //   var score = {};
    //   var tally = 0;

    //   customerArr.forEach(function(customer){
    //     tally++
    //     var keys = Object.keys(score);
    //     var choice = customer.choice.toString();
    //     if ( keys.indexOf( choice ) > -1 ) {
    //       console.log('already created');
    //       score[ choice ] += 1
    //     } else {
    //       score[ choice ] = 1
    //     }
    //   });
    //   $scope.selected.tally = tally;
    //   $scope.selected.score = score;
    // }
}]);