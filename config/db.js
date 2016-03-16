if (process.env.NODE_ENV === "production") {
  var modeUrl = process.env.MONGOLAB_URI;
} else {
  process.env.NODE_ENV = 'development';
  var modeUrl = 'mongodb://127.0.0.1/celldemand';
}

module.exports = {
  url: modeUrl
};
