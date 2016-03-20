var express      = require('express');
var router       = express.Router();
var Customer     = require('../models/customer');
var sendgrid     = require('sendgrid')(process.env.SENDGRID_KEY);

router.route('/')
  .post( function(req, res) {
    console.log("made a POST request to make a CUSTOMER");
    var reqbody = req.body;
    var htmlEmail = require('../emails/welcome').html;
    new Customer(reqbody).save(function(err, result) {
      if (err)
          res.send(err);
      var welcomeEmail = new sendgrid.Email({
                                              to: reqbody.email,
                                              from: 'brayzenone@gmail.com',
                                              subject: 'Welcome to Cooperative Wifi',
                                              html: htmlEmail
      });
      // welcomeEmail.addFile({ path: '../emails/welcome.'});
      sendgrid.send( welcomeEmail, function(err, json) {
        if (err) { return console.error(err); }
        console.log(json);
      })
      res.json(result); // return all nerds in JSON format
    });
  });

// returns just the number
router.route('/tally/:location')
      .post( function(req, res) {
        console.log("request for customer tally");
        var name = req.params.location;
        var reqNum = req.body.reqNum;
        var thresholdEmail = require('../emails/threshold').email(name, reqNum);
        Customer.find({locRef: name}, function(err, result) {
          if (err) {
            console.log(err);
            res.json({message: err});
          } else {
            if (result.length === reqNum ) {
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
