var express = require('express');
var router = express.Router();
// grab the location model we just created
var Location = require('../models/location');
var Locnames = require('../models/locationNames');
var Customer = require('../models/customer');
var passport = require('passport')


//Make a New location
router.route('/location/new')
  .post(function(req, res){
    console.log("Post request for a new location");
    var reqData = req.body;
    var reqName = reqData.name;
    new Locnames({name: reqName}).save(function(err, result){
      if (err)
        res.json({error: err});
      });
    new Location(reqData).save(function(err, result){
      if (err) {
        console.error(err);
        res.json({error: err});
      }
      res.json({result: 'Saved successfully'});
    });
  });

//get all location objects
router.route('/location/index')
  .get(function(req, res){
    console.log("get data for all locations");
    Location.find(function(err, result){
      if (err) {
        console.error(err);
        res.json({error: err});
      }
      res.json(result);
    });
  });

//All customers in specific location
router.route('/:location/customers')
  .get( function(req, res) {
    var location = req.params.location;
    Customer.find({locRef: location}, function(err, result) {
      if (err) {
          console.log(err);
          res.json({error: err});
      }
      console.log('Sent all the customer for ' + location);
      res.json(result);
    })
  })

// Delete a location
router.route('/location/delete')
  .post(function(req, res){
    console.log("post request to delete location");
    console.log(req.body)
    var reqName = req.body.name;
    var id = req.body;
    Location.remove({"_id": id}, function(err, result){
      if (err) { return res.json({error: err} )}
      console.log("success: " + result);
      Locnames.remove({name: reqName}, function(err, result){
        if (err) { return res.json(err) }
        console.log('deleted from both collections');
        res.json({success: 'deleted from both collections', result});
      })
    })
  });

module.exports = router;
