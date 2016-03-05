  angular.module('AdminCtrl', []).controller('AdminController', function($scope, $http) {
    var counter = 2;
    $scope.formData = {};
    $scope.formData.options = {};
    $scope.formHide = true;
    $scope.addLocBtn = true;
    $scope.tagline = 'Nothing beats a pocket protector!';

    // + button for options - adding an option
    $scope.addOption = function(){
      counter++
      $scope.formData.options["option" + counter] = '';
      $('.option-section').append('<input type="text" name="options" class="form-control col-xs-11 col-md-12 ng-pristine ng-untouched ng-valid ng-empty"' +
                                  ' id="location-option-' + counter + '" placeholder="Option ' + counter + ' - etc." ng-model="formData.options.option'+ counter +'">')
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
           })
    }

});
