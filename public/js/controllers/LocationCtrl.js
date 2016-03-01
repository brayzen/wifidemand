angular.module('LocationCtrl', [])
       .controller('LocationController', ['$scope', '$http', function($scope, $http) {
    // $scope.locations = LocationFactory.get(function(){
    //   // $scope.locations1 = ['breck', 'alma', 'fairplay'];
    //   // console.log($scope.locations);
    //   $scope.location = {name: 'Breck', description: 'Lorem Ipsum', options:['Option 1 for the win', 'Option 2 for the loose', 'Option 3 don\'t play']};

    // });

    //Populate selection box with location names\
    if (!localStorage.locations || localStorage.locations === "undefined"){
      $http.get('/api/location/names')
          .success(function(data){
              var arr = [];
              data.forEach(function(location){
                  arr.push(location['name']);
              });
              return $scope.townNames = localStorage.locations = arr;
          }).error(function(status, data){
              console.log(status);
              console.log(data);
          });
    } else {
      $scope.townNames = localStorage.locations.split(',');
    };

    $('#location-selection').on('change', function(){
      $scope.location1 = $http.get('/api/location/' + this.value)
                              .success(function(data){
                                console.info(data);
                                $scope.location = data;
                                })
                              .error(function(status, data){ console.error(data, status)})
      console.log($scope.location1);
    });
}]);
