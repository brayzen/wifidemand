// modules =================================================
var mongoose       = require('mongoose')
  , path           = require('path')
  , express        = require('express')
  , app            = express()
  , session        = require('express-session')
  , flash          = require('express-flash')
  , bodyParser     = require('body-parser')
  , methodOverride = require('method-override');
var passport       = require('./config/passport');
var jwt            = require('express-jwt');
var location       = require('./app/routes/locationRoutes');
var customer       = require('./app/routes/customerRoutes');
var admin          = require('./app/routes/adminRoutes');
var User           = require('./app/models/user');

var auth = jwt({secret: process.env.SECRET_CRYPTO || 'secret', userProperty: 'payload'});

// console.log(flash);
// configuration ===========================================
console.log(process.env.NODE_ENV + ' :::: Environment');

// config files
var db = require('./config/db');

// set our port
var port = process.env.PORT || 5050;

// connect to our mongoDB database
mongoose.connect(db.url);

// SET VIEW ENGINE.....could be JADE
app.set('view engine', 'html');
// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
  maxAge: 60000
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// routes ==================================================
app.get('/login', function(req, res){
    console.log('GET login route');
    res.sendfile('./public/views/templates/login.html');
});

app.post('/login', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  passport.authenticate('local', function(err, user, info){
    if (err) { return next(err); }
    if (user) {
      return res.json({token: user.generateJWT()});
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next)


});


  // .post(passport.authenticate('local', {failureFlash: 'failed in /login POST'}), function(req, res){
  //   console.log('POST to login route');
  //   console.log(req.user)
  //   res.sendfile('.public/views/admin-index.html');
  // })

app.use('/admin', auth,  admin);
app.use('/api/location', location);
app.use('/api/customer', customer);
app.get('/', function(req, res) {
  res.sendfile('./public/views/index.html'); // load our public/index.html file
});
// start app ===============================================
// startup our app at http://localhost:5000  set in the gulpfile
app.on('listening', function(){
  console.log('ok, server is running');
})
app.listen(port);

// shoutout to the user
console.log('Magic happens on port ' + port);

// expose app
exports = module.exports = app;
