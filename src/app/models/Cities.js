//Only official cases

const mongoose = require('../../services/database');

const CitiesSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  official_cases: {
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
  },
  crowd_cases: {
    suspects: {
      type: Number,
      default: 0,
    },
    confirmed: {
      type: Number,
      default: 0,
    },
    deaths: {
      type: Number,
      default: 0,
    },
  },
  state: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'State'
  },
  updatedAt: {
    type: Date,
    required: true,
  },
});

module.exports = {
  Cities: mongoose.model('Cities', CitiesSchema),
  CitiesSchema,
};