var express = require('express');
var router = express.Router();
var Customer = require('../models/customer');

router.route('/')
  .post( function(req, res) {
    console.log("made a POST request to make a CUSTOMER");
    console.log(req.body);
    var reqbody = req.body;
    new Customer(reqbody).save(function(err, result) {
      if (err)
          res.send(err);
      console.log(result);
      res.json(result); // return all nerds in JSON format
    });
  });
  //   } else {
  //     console.log("made a request to location");
  //     var locationName = req.params.name;
  //     loc.find({name: locationName}, function(err, result) {
  //       if (err)
  //           res.send(err);
  //       console.log(result);
  //       res.json(result); // return all nerds in JSON format
  //     });
  //   }
  // })

module.exports = router;

    // module.exports = function(app) {

    //     // server routes ===========================================================
    //     // handle things like api calls
    //     // authentication routes

    //     // sample api route
    //     app.get('/customers', function(req, res) {
    //         // use mongoose to get all nerds in the database
    //         console.log("made a request to customers...for names");
    //         var customerObj = req.body;
    //         db.customers.find(function(err, customerObj) {

    //             // if there is an error retrieving, send the error.
    //                             // nothing after res.send(err) will execute
    //             if (err)
    //                 res.send(err);

    //             res.json(customerObj); // return all nerds in JSON format
    //         });
    //     });

    //     app.get('/customer/:id', function(req, res) {
    //         // use mongoose to get all nerds in the database
    //         console.log("made a request to customer");
    //         var custationName = req.body;
    //         db.customers.find(function(err, customerObj) {

    //             // if there is an error retrieving, send the error.
    //                             // nothing after res.send(err) will execute
    //             if (err)
    //                 res.send(err);

    //             res.json(customerObj); // return all nerds in JSON format
    //         });
    //     });


    //     // route to handle creating goes here (app.post)
    //     // route to handle delete goes here (app.delete)

    //     // frontend routes =========================================================
    //     // route to handle all angular requests
    //     app.get('*', function(req, res) {
    //         res.sendfile('./public/views/index.html'); // load our public/index.html file
    //     });

    // };
