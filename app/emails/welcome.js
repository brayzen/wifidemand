module.exports = {
  email: function(name, email){
    return {
        to: email,
        from: process.env.FROM_EMAIL,
        // from: 'brayzenone@gmail.com',
        subject: 'Welcome to Cooperative Wifi',
        html: '<h1>Welcome from Raylife3</h1>' +

              '<p> Hi ' + name + ',</p>' +

              "<p> Thanks for signing up, you've been added to our customer list and we'll be contacting you as soon as we make any progress towards bringing your community better internet</p>" +

              "<p> If you liked to know more about the technology we'll employ, please visit <a href='#'>this link</a></p>" +

              "<p> In the meantime you can help speed up the process by forwarding your friends, neighbors, and community this email.</p>" +

              "<p> If you prefer Facebook <a href='#'><button>HERE</button></a><p>" +

              "<p> Sincerely,</p>" +

              "<p> Raylife </p>"
    }
  }
}

