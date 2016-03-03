angular.module('LocationService', [])
       .service('locationFactory', ['$http', function($http) {
            //query api for database locnames for all names of locations
            // this.getNames = function(){
            //     $http.get('/api/location/names?all=true')
            //       .success(function(data){
            //           var arr = [];
            //           data.forEach(function(location){
            //               arr.push(location.name);
            //           });
            //           localStorage.locations = arr;
            //           return $scope.townNames = arr;
            //       }).error(function(status, data){
            //           console.log(status);
            //           console.log(data);
            //       });
            // };

            // this.getALoc = function(name){
            //   $http.get('/api/location/' + name)
            //        .success(function(data){
            //          var data = data["0"];
            //          return data;
            //         }).error(function(status, data){
            //           console.error(data, status)
            //         })
            // };





    // return {

    //     // call to get all nerds
    //     get : function() {
    //         $http.get('/api/location/names')
    //             .success(function(data){
    //                 var arr = [];
    //                 data.forEach(function(location){
    //                     arr.push(location['name']);
    //                 });
    //                 console.info('arr: ' + arr);
    //                 console.info(Array.isArray(arr));
    //                 return arr;
    //             }).error(function(status, data){
    //                 console.log(status);
    //                 console.log(data);
    //             });

    //     },

    //     getOne : function(location) {
    //         return $http.get('/api/location/:name', location)
    //             .success(function(data){
    //                 console.log(data);
    //             }).error(function(status, data){
    //                 console.log(status);
    //                 console.log(data);
    //             });
    //     },
    //             // these will work when more API routes are defined on the Node side of things
    //     // call to POST and create a new nerd
    //     create : function(locationData) {
    //         return $http.post('/api/location/:name', locationData)
    //             .success(function(data){
    //                 console.log(data);
    //             }).error(function(status, data){
    //                 console.log(error);
    //                 console.log(data);
    //             });
    //     },

    //     update : function(locationData) {
    //         return $http.post('/api/location/:name', locationData)
    //             .success(function(data){
    //                 console.log(data);
    //             }).error(function(status, data){
    //                 console.log(error);
    //                 console.log(data);
    //             });
    //     },
    //             // call to DELETE a Location
    //     delete : function(id) {
    //         return $http.delete('/api/location/name')
    //             .success(function(data){
    //                 console.log(data);
    //             }).error(function(status, data){
    //                 console.log(error);
    //                 console.log(data);
    //             });
    //     }

    // };

}]);
