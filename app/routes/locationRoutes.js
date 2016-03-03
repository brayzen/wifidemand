var express = require('express');
var router = express.Router();
// grab the location model we just created
var loc = require('../models/location');
var locnames = require('../models/locationNames');


router.route('/:name')
  .get( function(req, res) {
    console.log(req.query.all);
    if (req.query.all) {
      console.log("made a request to locations...for ALL names");
      locnames.find({}, {'_id': false}, function(err, locations) {
        if (err)
            res.send(err);
        console.log(locations);
        res.json(locations); // return all nerds in JSON format
      });
    } else {
      console.log("made a request to location");
      var locationName = req.params.name;
      loc.find({name: locationName}, function(err, result) {
        if (err)
            res.send(err);
        console.log(result);
        res.json(result); // return all nerds in JSON format
      });
    }
  })

router.route('/:name')
  .post(function(req, res){
    console.log("Post request for a new location");
  });


module.exports = router;

