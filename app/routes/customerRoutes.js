var express      = require('express');
var router       = express.Router();
var Customer     = require('../models/customer');
var sendgrid     = require('sendgrid')(process.env.SENDGRID_KEY);

router.route('/')
  .post( function(req, res) {
    console.log("made a POST request to make a CUSTOMER");
    var reqbody   = req.body;
    var custName  = reqbody.firstName,
        custEmail = reqbody.email;
    var welcomeEmail = require('../emails/welcome').email(custName, custEmail);

    new Customer(reqbody).save(function(err, result) {
      if (err) { res.send(err); }
      sendgrid.send( welcomeEmail, function( err, result ) {
          if (err) { return console.error(err); }
          console.log(result);
      });
      res.json(result); // return all nerds in JSON format
    });
  });

// returns just the number
router.route('/tally/:location')
      .get( function(req, res) {
        console.log("request for customer tally");
        var name = req.params.location;
        var reqNum = req.query.reqNum;
        var thresholdEmail = require('../emails/threshold').email(name, reqNum);

        Customer.find({locRef: name}, function(err, result) {
          if (err) {
            console.log(err);
            res.json({message: err});
          } else {
            if ( result.length === reqNum ) {
              sendgrid.send( thresholdEmail, function( err, result ) {
                  if (err) { return console.error(err); }
                  console.log(result);
              });
            }
            console.log('Success, here is the tally of all the customer for ' + name + ': ' + result.length);
            res.json(result.length);
          }
        });
      });

module.exports = router;
