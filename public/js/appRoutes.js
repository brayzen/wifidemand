angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

        // nerds page that will use the NerdController
        .when('/admin', {
            templateUrl: 'views/admin.html',
            controller: 'AdminController'
        })

        .when('/locations', {
            templateUrl: 'views/location-form.html',
            controller: 'LocationController'
        });

    // $locationProvider.html5Mode(true);

}]);
