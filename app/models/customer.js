var mongoose = require('mongoose');

module.exports = mongoose.model('Customer', { locRef: { type: String, default: '' },
                                              firstName: { type: String, default: '' },
                                              lastName: {type: String, default: ''},
                                              email: {type: String, default: ''},
                                              selection: {type: Number, default: 0},
                                              street: {type: String, default: ''},
                                              city: {type: String, default: ''},
                                              state: {type: String, default: ''},
                                              zip: {type: Number, default: ''},
                                              choice: {type: String}
                                            });
