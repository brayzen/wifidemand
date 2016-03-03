var mongoose = require('mongoose');

module.exports = mongoose.model('Location', { name: { type: String, default: '' },
                                              description: {type: String, default: ''},
                                              options: {type: Array, default: ['']}
                                             });
