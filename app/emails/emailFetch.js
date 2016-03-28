const EventEmitter = require('events');
const emailData = new EventEmitter();
var fs = require('fs');

module.exports = {
  //Prepares email object...interpolates data , prepares object
  emailFetch: function(path, name, email, subject) {
                var data = fs.readFileSync(__dirname + path)
                console.log('have data')
                var dataString = data.toString().replace(/{{name}}/g, name).replace(/{{email}}/g, email);
                console.log('DATASTRING IS MADE');
                return {
                  to: email,
                  from: process.env.FROM_EMAIL,
                  subject: subject,
                  html: dataString
                };
              }
}
