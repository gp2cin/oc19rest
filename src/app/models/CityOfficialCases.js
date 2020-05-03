//Only official cases

const mongoose = require('../../services/database');

const CityOfficialCasesSchema = new mongoose.Schema({
  name: {
    type: String,
  },
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
  CityOfficialCases: mongoose.model('CityOfficialCases', CityOfficialCasesSchema),
  CityOfficialCasesSchema,
};