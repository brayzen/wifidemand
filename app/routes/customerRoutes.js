const EventEmitter = require('events');
var express      = require('express');
var router       = express.Router();
var Customer     = require('../models/customer');
var sendgrid     = require('sendgrid')(process.env.SENDGRID_KEY);
var Email        = require('../emails/emailFetch');
var path         = require('path');


router.route('/')
      .post( function(req, res) {
        console.log("request to make a CUSTOMER");
        var subject   = 'Welcome to Cooperative Wifi';
        var reqbody   = req.body;
        var custName  = reqbody.firstName,
            custEmail = reqbody.email;
        var emailObj = Email.emailFetch('/welcomeEmail.html', custName, custEmail, subject);
        new Customer(reqbody).save(function(err, result) {
          if (err) { res.send(err); }
          sendgrid.send( emailObj, function(err, message) {
              if (err) { return console.error(err); }
              console.log(message);
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

//customer unsubscribes from EMAIL
router.route('/remove')
      .post( (req, res) => {
        console.log("customer has unsubscribed");
        var custEmail = req.query.email;
        Customer.update({ email: custEmail }, {$set: {subscribed: false}}, (err, result) => {
          if (err) { return res.json(err) }
          var base = process.env.PWD;
          res.sendfile(base + '/public/views/unsubscribe.html')
          // res.json(result);
        })
      })

module.exports = router;
