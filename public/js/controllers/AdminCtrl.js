  angular.module('AdminCtrl', []).controller('AdminController', function($scope) {
    var counter = 1;
    $scope.tagline = 'Nothing beats a pocket protector!';

    $('.add-option').on('click', function(){
      console.log('here');
      counter++
      $('.option-section').append('<input style="clear:both;float:left;" type="text" class="form-control" value="" id="location-option-' + counter +
                                    '" placeholder="Option ' + counter + ' - etc.">')
    });

});
