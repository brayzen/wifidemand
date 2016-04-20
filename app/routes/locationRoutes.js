var express = require('express');
var router = express.Router();
// grab the location model we just created
var Location = require('../models/location');
// var Locnames = require('../models/locationNames');


router.route('/get/names')
  .get( function(req,res) {
    console.log("request for LocNames");
    Location.find({}, { name:1,  _id:0 }, function(err, result){
      if (err) {
         return res.send(err);
      }
      console.log(result);
      res.json(result);
    });
  });

router.route('/:name')
  .get( function(req, res) {
    console.log("made a request to location");
    var locationName = req.params.name;
    console.log(locationName);
    Location.find({name: locationName}, function(err, result) {
      if (err)
          res.send(err);
      console.log(result);
      res.json(result); // return all nerds in JSON format
    });
  });

module.exports = router;

