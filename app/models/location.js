var mongoose = require('mongoose');

module.exports = mongoose.model('Location', { name: { type: String, default: ''},
                                              description: {type: String, default: ''},
                                              target: {type: String, default: ''},
                                              reqNum: {type: Number, default: 100},
                                              options: {type: Object, default: ''},
                                              summary: {type: String, default: ''}
                                             });
