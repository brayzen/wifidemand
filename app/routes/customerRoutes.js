var express      = require('express');
var router       = express.Router();
var Customer     = require('../models/customer');
var sendgrid     = require('sendgrid')(process.env.SENDGRID_KEY);
var Email        = require('../emails/welcome')

router.route('/')
  .post( function(req, res) {
    console.log("%%%%%%%%%% request to make a CUSTOMER");
    var reqbody   = req.body;
    var custName  = reqbody.firstName,
        custEmail = reqbody.email;
    console.log(Email());
    var welEmail = Email(custName, custEmail);
    console.log('^^^^^^^^^^^^')
    console.log('^^^^^^^^^^^^')
    console.log('^^^^^^^^^^^^')
    console.log(welEmail);
    new Customer(reqbody).save(function(err, result) {
      if (err) { res.send(err); }
      sendgrid.send( welEmail, function( err, result ) {
          if (err) { return console.error(err); }
          console.log(result);
      });
      res.json(result);
    });
  });

// returns the current TALLY number
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
