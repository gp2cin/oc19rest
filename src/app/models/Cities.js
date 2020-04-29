const mongoose = require('../../services/database');

const StateSchema = new mongoose.Schema({
  suspects: {
    type: Number,
    required: true,
  },
  confirmed: {
    type: Number,
    required: true,
  },
  recovered: {
    type: Number,
    required: true,
  },
  deaths: {
    type: Number,
    required: true,
  },
  active: {
    type: Number,
    required: true,
  },
});

module.exports = {
  State: mongoose.model('State', StateSchema),
  StateSchema,
};