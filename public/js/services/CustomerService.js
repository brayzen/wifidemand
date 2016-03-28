angular.module('CustomerService', []).factory('Customer', ['$http', function($http) {

    return {
        // call to get all nerds
        get : function() {
            return $http.get('/api/:location/customers');
        },

        getOne: function(nameObj){
            return $http.get('/api/customer/:name');
        },
                // these will work when more API routes are defined on the Node side of things
        // call to POST and create a new nerd
        makeCustomer : function(customerData) {
            return $http.post('/api/customer', customerData);
        }
    };

}]);
