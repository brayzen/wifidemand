angular.module('LocationService', []).factory('LocationFactory', ['$http', function($http) {
    return {

        // call to get all nerds
        get : function() {
            $http.get('/api/location/names')
                .success(function(data){
                    var arr = [];
                    data.forEach(function(location){
                        arr.push(location['name']);
                    });
                    console.info('arr: ' + arr);
                    console.info(Array.isArray(arr));
                    return arr;
                }).error(function(status, data){
                    console.log(status);
                    console.log(data);
                });

        },

        getOne : function(location) {
            return $http.get('/api/location/:name', location)
                .success(function(data){
                    console.log(data);
                }).error(function(status, data){
                    console.log(status);
                    console.log(data);
                });
        },
                // these will work when more API routes are defined on the Node side of things
        // call to POST and create a new nerd
        create : function(locationData) {
            return $http.post('/api/location/:name', locationData)
                .success(function(data){
                    console.log(data);
                }).error(function(status, data){
                    console.log(error);
                    console.log(data);
                });
        },

        update : function(locationData) {
            return $http.post('/api/location/:name', locationData)
                .success(function(data){
                    console.log(data);
                }).error(function(status, data){
                    console.log(error);
                    console.log(data);
                });
        },
                // call to DELETE a Location
        delete : function(id) {
            return $http.delete('/api/location/name')
                .success(function(data){
                    console.log(data);
                }).error(function(status, data){
                    console.log(error);
                    console.log(data);
                });
        }

    };

}]);
