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

//All customers in specific location
router.route('/:location/all')
  .get( function(req, res) {
    var location = req.params.location
    console.log(location + ' WEEEEEEEEEEEEEEE');

    Customer.find({locRef: location}, function(err, result){
      if (err) {
          console.log(err);
          res.json({error: err});
      }
      console.log('Success here are all the customer for ' + location + ':');
      console.log(result);
      res.json(result);
    })
  })

module.exports = router;
