

// modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var mongoose       = require('mongoose');
var location = require('./app/routes/locationRoutes');
var customer = require('./app/routes/customerRoutes');
var admin = require('./app/routes/adminRoutes');

// configuration ===========================================
console.log(process.env.NODE_ENV + ' :::: Environment');

// config files
var db = require('./config/db');

// set our port
var port = process.env.PORT || 4000;

// connect to our mongoDB database
// (uncomment after you enter in your own credentials in config/db.js)
mongoose.connect(db.url);

// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

// routes ==================================================
app.get('/admin', function(req, res) {
  res.sendfile('./public/views/index.html'); ///SHOULD BE AUTH FORM
});
app.use('/admin/api', admin);
app.use('/api/location', location);
app.use('/api/customer', customer);
app.get('/', function(req, res) {
  res.sendfile('./public/views/index.html'); // load our public/index.html file
});

// start app ===============================================
// startup our app at http://localhost:5000  set in the gulpfile
app.listen(port);

// shoutout to the user
console.log('Magic happens on port ' + port);

// expose app
exports = module.exports = app;
