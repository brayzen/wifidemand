var fs = require('fs');
var Promise = require('promise');
var read = Promise.denodeify(fs.readFile)

// var p = read('foo.json', 'utf8')
//   .then(function (str) {
//     return write('foo.json', JSON.stringify(JSON.parse(str), null, '  '), 'utf8')
//   })

var email = function(custName, custEmail){
    read(__dirname + '/welcomeEmail.html', 'utf8')
    .then(function(data) {
      return data.toString().replace(/{{name}}/g, custName).replace(/{{email}}/g, custEmail);
    }).then(function(data){
      var obj = {
        to: custEmail,
        from: process.env.FROM_EMAIL,
        subject: 'Welcome to Cooperative Wifi',
        html: data
      };
      return(obj);
    })
    // if (err) throw err;
    // console.log('fs.readFile for WELCOME email was successful');
    // var dataString = data.toString().replace(/{{name}}/g, custName).replace(/{{email}}/g, custEmail);
    // console.log(dataString);
    // return 'hello world';
    // return {
    //   to: custEmail,
    //   from: process.env.FROM_EMAIL,
    //   subject: 'Welcome to Cooperative Wifi',
    //   html: dataString
    // }
  // });
}

module.exports = email;




