const mongoose = require('../../services/database');

const CitySchema = new mongoose.Schema({
  official_cases: {
    type: {},
    require: true,
  },
  crowd_cases: {
    type: {},
  },
  state: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'State'
  },
  updated_at: {
    type: Date,
    required: true,
  },
});

module.exports = {
  City: mongoose.model('City', CitySchema),
  CitySchema,
};