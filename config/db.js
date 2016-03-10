if (process.env.mode === "PRODUCTION") {
  var modeUrl = process.env.MONGOLAB_URI;
} else {
  var modeUrl = 'mongodb://127.0.0.1/celldemand';
}

module.exports = {
  url: modeUrl
};
