 // app/routes.js

// grab the nerd model we just created
var loc = require('./models/location');
var locNames = require('./models/locationNames');

  module.exports = function(app) {
    app.get('/locations', function(req, res) {
        // use mongoose to get all nerds in the database
        console.log("made a request to locations...for names");
        // var locationName = req.params.locselect;
        console.log(loc.db);
        locNames.find({},{'_id': false}, function(err, locNames) {

            // if there is an error retrieving, send the error.
                            // nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.send(locNames); // return all nerds in JSON format
        });
    });

    app.get('/locationone', function(req, res) {
        // use mongoose to get all nerds in the database
        console.log("made a request to location");
        var locationName = req.params.locselect;
        loc.find(function(err, result) {

            // if there is an error retrieving, send the error.
                            // nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(result); // return all nerds in JSON format
        });
    });


    // route to handle creating goes here (app.post)
    // route to handle delete goes here (app.delete)

    // frontend routes =========================================================
    // route to handle all angular requests
    // app.get('*', function(req, res) {
    //     res.sendfile('./public/views/index.html'); // load our public/index.html file
    // });

  };
