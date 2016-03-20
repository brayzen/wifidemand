module.exports = {
  email: function(name, reqNum){
    return {
        to: 'bray213@gmail.com',
        from: 'brayzenone@gmail.com',
        subject: 'Location: ' + name + ', has met the minimum required number for investment',
        html: '<h1> Check your dashboard, ' + name + ' has crossed the threshold of ' + reqNum + ' people</h1>'
    }
  }
}


