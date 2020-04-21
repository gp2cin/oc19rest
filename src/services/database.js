'use strict';
const config = require('../config/config');
const mongoose = require('mongoose');
mongoose
  .connect(config.uri, config.options)
  .then(() => {
    console.log('MongoDB is connected');
  })
  .catch((err) => {
    console.log(err);
  });

mongoose.Promise = global.Promise;

module.exports = mongoose;
