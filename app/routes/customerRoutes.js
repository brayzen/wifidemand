var express = require('express');
var router = express.Router();
var Customer = require('../models/customer');

router.route('/')
  .post( function(req, res) {
    console.log("made a POST request to make a CUSTOMER");
    var reqbody = req.body;

    new Customer(reqbody).save(function(err, result) {
      if (err)
          res.send(err);
      console.log({"SUCCESS": result});
      res.json(result); // return all nerds in JSON format
    });
  });

//Authenticate
//All customers in specific location
// router.route('/:location/all')
//   .get( function(req, res) {
//     var location = req.params.location
//     console.log(location + ' WEEEEEEEEEEEEEEE');

//     Customer.find({locRef: location}, function(err, result) {
//       if (err) {
//           console.log(err);
//           res.json({error: err});
//       }
//       console.log('Sent all the customer for ' + location);
//       res.json(result);
//     })
//   })

// returns just the number
router.route('/tally/:location')
      .get( function(req, res) {
        console.log("requst for customer tally")
        var name = req.params.location;
        Customer.find({locRef: name}, function(err, result) {
          if (err) {
            console.log(err);
            res.json({message: err});
          } else {
            console.log('Success here is the tally of all the customer for ' + name + ': ' + result.length);
            res.json(result.length);
          }
        })
      })

module.exports = router;
