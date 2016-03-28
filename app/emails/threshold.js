module.exports = {
  email: function(locationName, reqNum){
    return {
        to: process.env.TO_EMAIL,
        from: process.env.FROM_EMAIL,
        subject: 'Location: ' + locationName + ', has met the minimum required number for investment',
        html: '<h1> Check your dashboard, ' + locationName + ' has crossed the threshold of ' + reqNum + ' people</h1>'
    }
  }
}


