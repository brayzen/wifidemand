angular.module('AdminCtrl', ['chart.js', 'flash', 'AuthService'])
  .controller('AdminController', ['$scope', '$http', '$window', 'flash', function($scope, $http, $window, flash) {
    var counter = 1;
    $scope.locations = [];
    $scope.needShow = true;
    $scope.optionsToAdd = [{}];
    $scope.emailList = [];
    $scope.ifAuthed = false;
    $scope.tab = 1;
    // console.warn(Auth.getTsoken());
    //AUTH
    $scope.getToken = function(){
      return $window.localStorage.jwtWIFI || null;
    };

    function resetForm() {
      $scope.formData = {};
      $scope.formData.options = [];
    };
    resetForm();

    $scope.setTab = function(newValue){
      $scope.tab = newValue;
      if (newValue === 2 || newValue === 6) {
        resetForm();
      }
    };

    $scope.isSet = function(tabName){
      return $scope.tab === tabName;
    };

    //AUTH
    function parseJwt(token) {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse($window.atob(base64));
    }

    //AUTH
    function isAuthed(){
      var token = $scope.getToken();
      if(token) {
        var params = parseJwt(token);
        var answer = Math.round(new Date().getTime() / 1000) <= params.exp;
        $scope.ifAuthed = answer;
        if (answer) {
          $scope.headers = {headers: {Authorization: 'Bearer ' + $scope.getToken()}};
        }
        return answer
      } else {
        $scope.ifAuthed = false;
        return false
      }
    }

    //AUTH
    $scope.login = function(){
      $http.post('/login', $scope.formData)
           .then(function(res){
              $window.localStorage.jwtWIFI = res.data.token;
              loadLocations();
              $scope.headers = {headers: {Authorization: 'Bearer ' + $scope.getToken()}} || null;
              resetForm();
           }, function(data){
              // console.error(data);
              console.error(data.status);
              flash('Incorrect creditials: "' + data.statusText + '"');
           });
    };

    // Default load all locations to page
    function loadLocations() {
        if(isAuthed()){
          var token = $scope.getToken();
          console.log('making a call to load locations');
          $http.get('/admin/location/index', {headers: {Authorization: 'Bearer ' + token}})
               .success(function(data){
                // console.info(data);
                $scope.locations = data;
               }).error(function(status, data){
                console.error(status);
                // console.warn(data);
                flash(data);
               });
         }
      }
    // }
    loadLocations();


    $scope.add =function(addOption){
      if (addOption !== '') {
        counter++;
        $scope.formData.options.push(angular.copy(addOption));
        $scope.optionToAdd = '';
        // console.log($scope.optionToAdd);
        $('#option-input').val('').attr('placeholder', 'Option-' + counter).focus();
      } else {
        flash('Enter option before adding');
      }
    };

    $scope.clearOptions = function(){
      if (confirm("Are you sure you want to clear all options?")) {
        counter = 1;
        $('#option-input').val('').attr('placeholder', 'Option-' + counter).focus();
        $scope.formData.options = [];
      }
    };

    $scope.addLocation = function() {
      if (isAuthed()) {
        $http.post('/admin/location/new', $scope.formData, $scope.headers)
             .success(function(data){
              // console.log(data);
              $scope.formHide = true;
              $scope.locations.push($scope.formData);
              resetForm()
              counter = 1;
             }).error(function(status, data){
              console.error(status);
              // console.error(data);
              flash(data);
             });
      }
    };

    $scope.showLocationStats = function(location){
      if(isAuthed()){
        $scope.selected = location;
        $scope.setTab(3);
        $scope.needShow = false;
        getCustomers(location);
      }
    };

    $scope.loadLocationData = function(location){
      console.log(location + '::: load location data');
      $scope.formData = location;
      $scope.formData.options = location.options;
    }

    $scope.updateLocation = function(){
      if (isAuthed() && confirm("Are you sure you want to update/change this location?")) {
        var locationName = encodeURIComponent($scope.formData.name);
        $http.post('admin/' + locationName + '/update', $scope.formData, $scope.headers)
             .then(function(data){
              // console.log('update successfully');
              // console.log(data.data);
              if (data.data.name === "CastError") {
                flash('ERROR ' + data.data.name );
              }
             }, function(data, status){
              if (data.data.nModified === 0) {
                flash('Nothing changed, likely tried to alter Project Name, Not allowed, make a new location.  Data is linked to this name');
              } else {
                $scope.setTab(1);
              }
              // console.log(data);
              console.log(status);
             });
      }
    }

    $scope.confirmDelete = function(location){
      if (isAuthed() && confirm("Are you sure you want to delete this location?")) {
        $http.post('admin/location/delete', location, $scope.headers)
             .success(function(data){
              // console.log(data);
              // displayMessage(data);
              var index = $scope.locations.indexOf( location );
              $scope.locations.splice(index, 1);
             }).error(function(data, status){
              console.error(status);
              // console.warn(data);
              flash(data);
             });
      }
    };

    function getCustomers(location) {
      if (isAuthed()){
        console.log('getting all customers for ' + location.name );
        var locationName = encodeURIComponent(location.name);

        $http.get('/admin/' + locationName + '/customers', $scope.headers)
             .success(function(data){
              tallyOptions(data);
              $scope.selected.customers = data;
              // console.log($scope.selected.customers);
             }).error(function(data, status){
              console.error(status);
              // console.error(data);
             });
      }
    }

    function tallyOptions(customerArr){
      var score = {};
      var tally = 0;

      customerArr.forEach(function(customer){
        tally++;
        var keys = Object.keys(score);
        var choice = customer.choice.toString();
        if ( keys.indexOf( choice ) > -1 ) {
          console.log('already created');
          score[ choice ] += 1;
        } else {
          score[ choice ] = 1;
        }
      });
      $scope.selected.tally = tally;
      $scope.selected.score = score;
      // console.log(score);
      makeChart($scope.selected.score);
    }

    $scope.showCustomerTable = function(){
      console.log('SHOWING TABLE');
      $scope.hideCustTable = false;
      $scope.showData = false;
    };

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
      var emailString = '';
      $scope.selected.customers.forEach(function(customer, index){
        if(customer.subscribed === false || emailString.indexOf(customer.email) > -1) {
          return
        } else {
          if (index % 5 === 0){
            emailString += '\n' + customer.email + ', ';
          } else if (customers[index] === undefined){
            emailString += customer.email;
          } else {
            emailString += customer.email + ', ';
          }
        }
      });
      $scope.selected.emails = emailString;
    };
}]);
