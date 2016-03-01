var mongoose = require('mongoose');

module.exports = mongoose.model('Customer', { firstName: { type: String, default: '' },
                                              lastName: {type: String, default: ''},
                                              email: {type: String, default: ''},
                                              selection: {type: Number, default: 0},
                                              street: {type: String, default: ''},
                                              city: {type: String, default: ''},
                                              state: {type: String, default: ''},
                                              zip: {type: Number, default: ''}
                                            });
