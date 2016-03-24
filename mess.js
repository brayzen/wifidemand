var Promise = require('promise');
console.log(Promise);
var Email = require('./app/emails/welcome.js');
var e = new Promise(Email('brayzen', 'brayzen@test.com'));
console.log(e.toString());



//// As best as I can remember, I needed to use this function to create the proper object to
//// then use mongo to connect to mongoLab
// var User = require('./app/models/user');
// var crypto = require('crypto');

// function makeAdminUser(username, password){
//   var salt1 = crypto.randomBytes(16).toString('hex');
//   var hash1 = crypto.pbkdf2Sync(password, salt1, 1000, 64).toString('hex');
//   console.log({username: username, salt: salt1, hash: hash1});
// }

// makeAdminUser(process.argv[2], process.argv[3]);






// // ADMIN CONTROLLER
// // ADMIN CONTROLLER
// // ADMIN CONTROLLER
// // ADMIN CONTROLLER
// // ADMIN CONTROLLER
// // ADMIN CONTROLLER
// // ADMIN CONTROLLER
// // ADMIN CONTROLLER
// // ADMIN CONTROLLER
// var app = angular.module('AdminCtrl', ['chart.js', 'flash', 'AuthService']);
// app.service('Authen', function($window) {

//     this.getToken = function(){
//       return $window.localStorage.jwtWIFI;
//     }

//         //AUTH
//     this.parseJwt = function(token){
//       var base64Url = token.split('.')[1];
//       var base64 = base64Url.replace('-', '+').replace('_', '/');
//       return JSON.parse($window.atob(base64));
//     }

//     //AUTH
//     this.isAuthed = function(){
//       var token = getToken();
//       if(token) {
//         var params = parseJwt(token);
//         var answer = Math.round(new Date().getTime() / 1000) <= params.exp;
//         this.authed = answer;
//         return answer;
//       } else {
//         this.authed = false;
//         return false;
//       }
//     }

// });

// // CONTROLLER
// // CONTROLLER
// // CONTROLLER
// // CONTROLLER
// // CONTROLLER
// app.controller('AdminController', function($scope, $http, $window, Authen) {
//     var counter = 1;
//     $scope.locations = [];
//     $scope.needShow = true;
//     $scope.formData = {};
//     $scope.formData.options = [];
//     $scope.optionsToAdd = [{}];
//     $scope.emailList = [];
//     $scope.authed = false;
//     console.log('AUTH AUTH AUTH: '+ Authen.getToken())

//     $scope.tab = 1;
//     // console.warn(Auth.getTsoken());
//     //AUTH
//     $scope.getToken = function(){
//       return $window.localStorage.jwtWIFI;
//     }
//     $scope.headers = {headers: {Authorization: 'Bearer ' + $scope.getToken()}}

//     $scope.setTab = function(newValue){
//       $scope.tab = newValue;
//     };

//     $scope.isSet = function(tabName){
//       return $scope.tab === tabName;
//     };

//     //AUTH
//     function parseJwt(token) {
//       var base64Url = token.split('.')[1];
//       var base64 = base64Url.replace('-', '+').replace('_', '/');
//       return JSON.parse($window.atob(base64));
//     }

//     //AUTH
//     function isAuthed(){
//       var token = $scope.getToken();
//       if(token) {
//         var params = parseJwt(token);
//         $scope.authed = Math.round(new Date().getTime() / 1000) <= params.exp;
//         console.log($scope.authed)
//         return $scope.authed;
//       } else {
//         $scope.authed = false;
//         console.log($scope.authed)
//         return $scope.authed;
//       }
//     }
//     //AUTH

//     $scope.login = function(){
//       console.log("BOOYA")
//       $http.post('/login', $scope.formData)
//            .then(function(res){
//               console.info(res.data);
//               $scope.formData = {};
//               $window.localStorage.jwtWIFI = res.data.token;
//               $scope.authed = true;
//               loadLocations();
//            }, function(data, status){
//               console.error(data);
//               console.error(status);
//               // $scope.formData = {};
//            });
//     };

//     // Default load all locations to page
//     function loadLocations() {
//         if(isAuthed()){
//           var token = $scope.getToken();
//           console.log('making a call to load locations');
//           console.warn(token);
//           // var data = $http.headers.common['Authorization'] = 'Bearer ' + token;
//           $http.get('/admin/location/index', {headers: {Authorization: 'Bearer ' + token}})
//                .success(function(data){
//                 console.info(data);
//                 $scope.locations = data;
//                }).error(function(status, data){
//                 console.error(status);
//                 console.warn(data);
//                });
//          }
//       }
//     // }
//     loadLocations();


//     $scope.add =function(addOption){
//       counter++;
//       $scope.formData.options.push(angular.copy(addOption));
//       $scope.optionToAdd = '';
//       console.log($scope.optionToAdd);
//       $('#option-input').val('').attr('placeholder', 'Option-' + counter).focus();
//     };

//     $scope.clearOptions = function(){
//       if (confirm("Are you sure you want to clear all options?")) {
//         counter = 1;
//         $('#option-input').val('').attr('placeholder', 'Option-' + counter).focus();
//         $scope.formData.options = [];
//       }
//     };

//     $scope.addLocation = function() {
//       console.log('submitting');
//       console.info($scope.formData);
//       $http.post('/admin/location/new', $scope.formData, $scope.headers)
//            .success(function(data){
//             console.log(data);
//             console.info("disply success on screen");
//             $scope.formHide = true;
//             $scope.locations.push($scope.formData);
//             $scope.formData = {};
//             $scope.clearOptions();
//            }).error(function(status, data){
//             console.error(status);
//             console.error(data);
//             flash(data);
//            });
//     };

//     $scope.showLocationStats = function(location){
//       $scope.selected = location;
//       $scope.setTab(3);
//       $scope.needShow = false;
//       getCustomers(location);
//     };

//     $scope.confirmDelete = function(location){
//       if (confirm("Are you sure you want to delete this location?")) {
//         $http.post('admin/location/delete', location, $scope.headers)
//              .success(function(data){
//               console.log(data);
//               // displayMessage(data);
//               var index = $scope.locations.indexOf( location );
//               $scope.locations.splice(index, 1);
//              }).error(function(data, status){
//               console.error(status);
//               console.warn(data);
//               flash(data);
//              });
//       }
//     };

//     function getCustomers(location) {
//       console.log('getting all customers for ' + location.name );
//       var locationName = location.name;

//       $http.get('/admin/' + locationName + '/customers', $scope.headers)
//            .success(function(data){
//             console.log("success: " + data);
//             tallyOptions(data);
//             $scope.selected.customers = data;
//            }).error(function(data, status){
//             console.error(status);
//             console.error(data);
//             flash(data);
//            });
//     }

//     function tallyOptions(customerArr){
//       var score = {};
//       var tally = 0;

//       customerArr.forEach(function(customer){
//         tally++;
//         var keys = Object.keys(score);
//         var choice = customer.choice.toString();
//         if ( keys.indexOf( choice ) > -1 ) {
//           console.log('already created');
//           score[ choice ] += 1;
//         } else {
//           score[ choice ] = 1;
//         }
//       });
//       $scope.selected.tally = tally;
//       $scope.selected.score = score;
//       console.log(score);
//       makeChart($scope.selected.score);
//     }

//     $scope.showCustomerTable = function(){
//       console.log('SHOWING TABLE');
//       $scope.hideCustTable = false;
//       $scope.showData = false;
//     };

//     // Chart.js
//     function makeChart(score) {
//       var data = [];
//       var labels = [];
//       Object.keys(score).forEach(function(key, index){
//         data.push(score[key]);
//         labels.push('Option-' + key);
//       });
//       $scope.labels = labels;
//       $scope.data = data;
//     }

//     // Copy format
//     $scope.copyCSEmails = function(customers) {
//       var emailString = '';
//       $scope.selected.customers.forEach(function(customer, index){
//         if (index % 5 === 0){
//           emailString += '\n' + customer.email + ', ';
//         } else if (customers[index] === undefined){
//           emailString += customer.email;
//         } else {
//           emailString += customer.email + ', ';
//         }
//       });
//       $scope.selected.emails = emailString;
//     };
// });


