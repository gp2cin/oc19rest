//Only official cases
const mongoose = require('../../services/database');

const StateSchema = new mongoose.Schema({
  name: {
    type: String,
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
  lethality_percentage: {
    type: Number,
    required: true,
  },
  mortality_100k: {
    type: Number,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
});

module.exports = {
  State: mongoose.model('State', StateSchema),
  StateSchema,
};
