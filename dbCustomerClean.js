var Cronjob = require('cron').CronJob;
var Customers = require('./app/models/customer');
var Promise  = require('promise');

Customers.find({}, function(err, customers){
    if (err) return err;
    console.log('HERE from the CRONTAB');
    console.log(customers);
});

new Cronjob('38 12 * * *', function(){
  console.log('here in cronjob');
  Customers.find({}, function(err, customers){
    console.log('HERE from the CRONTAB');
    console.log(customers);
  });
}, function(customers){
    console.log(custmrs);
    customers.forEach(function(cstmr){
      console.log(cstrm);
    }
)}, true, 'America/Los_Angeles');

