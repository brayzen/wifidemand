var express = require('express');
var router = express.Router();
// grab the location model we just created
var loc = require('../models/location');
var locnames = require('../models/locationNames');


router.route('/')
  .get(function(req, res) {
    console.log("made a request to location");
    var locationName = req.params.locselect;
    locnames.find(function(err, result) {
      if (err)
          res.send(err);
      console.log(result);
      res.json(result); // return all nerds in JSON format
    });
  })

  .post(function(req, res){
    console.log("Post request for a new location");
  });


router.route('/names')
  .get(function(req, res) {
    console.log("made a request to locations...for names");
    locnames.find({}, {'_id': false}, function(err, locations) {
      if (err)
          res.send(err);
      console.log(locations);
      res.json(locations); // return all nerds in JSON format
    });
  });

module.exports = router;

