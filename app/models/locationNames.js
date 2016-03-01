var mongoose = require('mongoose');

module.exports = mongoose.model('Locnames', { name: { type: String, default: '' }});
