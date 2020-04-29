const mongoose = require('../../services/database');

const WorldSchema = new mongoose.Schema({
  confirmed: {
    type: Number,
    required: true,
  },
  deaths: {
    type: Number,
    required: true,
  },
  new_cases: {
    type: Number,
    required: true,
  },
  new_deaths: {
    type: Number,
    required: true,
  },
  updated_at: {
    type: Date,
    required: true,
  },
});

module.exports = {
  World: mongoose.model('World', WorldSchema),
  WorldSchema,
};
