angular.module('AdminCtrl', ['chart.js'])
  .controller('AdminController', function($scope, $http) {
    var counter = 1;
    $scope.locations = [];
    $scope.needShow = true;
    $scope.formData = {};
    $scope.formData.options = [];
    $scope.optionsToAdd = [{}];
    $scope.emailList = [];

    $scope.tab = 1;

    $scope.setTab = function(newValue){
      $scope.tab = newValue;
    }

    $scope.isSet = function(tabName){
      return $scope.tab === tabName;
    }

    // Default load all locations to page
    function loadLocations() {
      if ($scope.locations.length >= 1){
        console.log('no need for a call');
      } else {
        console.log('making a call to load locations');
        $http.get('/api/location/all/all')
             .success(function(data){
              console.info(data);
              $scope.locations = data;
             }).error(function(status, data){
              $('#flash').text('Could not load all locations.  Check connection');
              console.error(status);
              console.warn(data);
             });
      }
    }
    loadLocations();


    $scope.add =function(addOption){
      counter++
      $scope.formData.options.push(angular.copy(addOption))
      $scope.optionToAdd = '';
      console.log($scope.optionToAdd);
      $('#option-input').val('').attr('placeholder', 'Option-' + counter).focus();
    }

    $scope.clearOptions = function(){
      if (confirm("Are you sure you want to clear all options?")) {
        counter = 1;
        $('#option-input').val('').attr('placeholder', 'Option-' + counter).focus();
        $scope.formData.options = [];
      };
    }
    // + button for options - adding an option
    // $scope.addOption = function(){
    //   counter++;
    //   $('.option-section').append('<input type="text" name="options" class="form-control col-xs-11 col-md-12 ng-pristine ng-untouched ng-valid ng-empty"' +
    //                               ' id="location-option-' + counter + '" placeholder="Option ' + counter + ' - etc." ng-model="formData.options.option' + counter + '">');
    //   $scope.$watch(function(){
    //     $scope.formData.options["option" + counter];
    //   })
    //   $('#location-content').append('<p ng-binding="formData.options.option' + counter + '"></p>')
    // };

    $scope.addLocation = function() {
      console.log('submitting');
      console.info($scope.formData);
      $http.post('/api/location', $scope.formData)
           .success(function(data){
            console.log(data);
            console.info("disply success on screen");
            $scope.formHide = true;
            $scope.addLocBtn = true;
            $scope.formData = {};
            $scope.locations.push($scope.formData)
           }).error(function(status, data){
            console.error(status);
            console.error(data);
           });
    };

    $scope.showLocationStats = function(location){
      $scope.selected = location;
      $scope.setTab(3);
      $scope.needShow = false;
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
      console.log('getting all customers for ' + location.name );
      var locationName = location.name;

      $http.get('/api/customer/' + locationName + '/all')
           .success(function(data){
            console.log("success: " + data);
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
      makeChart($scope.selected.score);
    }

    $scope.showCustomerTable = function(){
      console.log('SHOWING TABLE');
      $scope.hideCustTable = false;
      $scope.showData = false;
    }

    // Chart.js
    function makeChart(score) {
      var data = [];
      var labels = [];
      Object.keys(score).forEach(function(key, index){
        data.push(score[key]);
        labels.push('Option-' + key);
      });
      $scope.labels = labels;
      $scope.data = data;
    }

    // Copy format
    $scope.copyCSEmails = function(customers) {
      emailString = '';
      $scope.selected.customers.forEach(function(customer, index){
        if (index % 5 === 0){
          emailString += '\n' + customer.email;
        } else if (customers[index + 1] === undefined){
          emailString += customer.email;
        } else {
          emailString += customer.email + ', ';
        }
      });
      $scope.selected.emails = emailString;
    }
})
