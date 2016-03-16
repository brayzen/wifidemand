var express = require('express');
var router = express.Router();
// grab the location model we just created
var Location = require('../models/location');
var Locnames = require('../models/locationNames');


router.route('/get/names')
  .get( function(req,res) {
    console.log("request for LocNames");
    Locnames.find(function(err, result){
      if (err) {
         return res.send(err);
      }
      console.log(result);
      res.json(result);
    })
  })

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

//Authenticate
// router.route('/')
//   .post(function(req, res){
//     console.log("Post request for a new location");
//     var reqData = req.body;
//     var reqName = reqData.name;
//     new Locnames({name: reqName}).save(function(err, result){
//       if (err)
//         res.json({error: err});
//       });
//     new Location(reqData).save(function(err, result){
//       if (err) {
//         console.error(err);
//         res.json({error: err});
//       }
//       res.json({result: 'Saved successfully'});
//     });
//   });

//Authenticate
// router.route('/all/all')
//   .get(function(req, res){
//     console.log("get data for all locations");
//     Location.find(function(err, result){
//       if (err) {
//         console.error(err);
//         res.json({error: err});
//       }
//       res.json(result);
//     });
//   });


// Delete location
// router.route('/delete/delete')
//   .post(function(req, res){
//     console.log("post request to delete location");
//     console.log(req.body)
//     var id = req.body;
//     Location.remove({"_id": id}, function(err, result){
//       if (err) {
//         res.json({error: err});
//       }
//       console.log("success: " + result);
//       res.json(result);
//     })
//   });

module.exports = router;

