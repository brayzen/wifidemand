angular.module('CustomerService', []).factory('Customer', ['$http', function($http) {

    return {
        // call to get all customers
        get : function() {
            return $http.get('/customer');
        },

                // these will work when more API routes are defined on the Node side of things
        // call to POST and create a new customer
        create : function(customerData) {
            return $http.post('/customer', nerdData);
        },

        // call to DELETE a customer
        delete : function(id) {
            return $http.delete('customer' + id);
        }
    };

}]);
