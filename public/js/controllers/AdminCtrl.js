angular.module('AdminCtrl', [])
  .controller('AdminController', function($scope, $http) {
    var counter = 2;
    $scope.formData = {};
    $scope.formData.options = {};
    $scope.formHide = true;
    $scope.addLocBtn = true;
    $scope.tagline = 'Nothing beats a pocket protector!';
    $scope.showTable = true;

    $scope.hideStats = true;
    $scope.hideIndexBtn = true;

    $scope.showCustomersBtn = true;
    $scope.hideDataBtn = true;

    $scope.showData = true;
    $scope.locations = [];


    // Default load all locations
    $http.get('/api/location/all/all')
         .success(function(data){
          // console.info(data);
          $scope.locations = data;
         }).error(function(status, data){
          console.error(status);
          console.warn(data);
         });

    // + button for options - adding an option
    $scope.addOption = function(){
      counter++;
      $scope.formData.options["option" + counter] = '';
      $('.option-section').append('<input type="text" name="options" class="form-control col-xs-11 col-md-12 ng-pristine ng-untouched ng-valid ng-empty"' +
                                  ' id="location-option-' + counter + '" placeholder="Option ' + counter + ' - etc." ng-model="formData.options.option'+ counter +'">');
    };

    $scope.addLocation = function() {
      console.log('submitting');
      $http.post('/api/location', $scope.formData)
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



    $scope.showLocationStats = function(location){
      $scope.selected = location;
      console.info($scope.selected);
      $scope.hideStats = false;
      $scope.showTable = false;
      $scope.hideIndexBtn = false;
      getCustomers(location);
    };

    $scope.confirmDelete = function(location){
      if (confirm("Are you sure you want to delete this location?")) {
        $http.post('/api/location/delete/delete', location )
             .success(function(data){
              console.log(data);
              // displayMessage(data);
              var index = $scope.locations.indexOf( location );
              $scope.locations.splice(index, 1);
             }).error(function(data, status){
              console.error(status);
              console.warn(data);
             });
      }
    };

    function getCustomers(location) {
      console.log('getting all customers');
      var locationName = location.name;

      $http.get('/api/customer/' + locationName + '/all')
           .success(function(data){
            console.log("success: " + data);
            console.info(data);
            tallyOptions(data);
            $scope.selected.customers = data;
           }).error(function(data, status){
            console.error(status);
            console.error(data);
           });
    }

    function tallyOptions(customerArr){
      var score = {};
      var tally = 0;

      customerArr.forEach(function(customer){
        tally++
        var keys = Object.keys(score);
        var choice = customer.choice.toString();
        if ( keys.indexOf( choice ) > -1 ) {
          console.log('already created');
          score[ choice ] += 1
        } else {
          score[ choice ] = 1
        }
      });
      $scope.selected.tally = tally;
      $scope.selected.score = score;
      console.log($scope.selected.score);
    }

    $scope.showCustomerTable = function(){
      console.log('SHOWING TABLE');
    }
});
