//Only official cases

const mongoose = require('../../services/database');
const { PolygonSchema } = require('./utils/Polygon');

const CitySchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  properties: {
    id_city: {
      type: Number,
      require: true,
    },
    name_ca: {
      type: String,
      required: true
    },
    name: {
      type: String,
      require: true
    },
    state: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'State'
    },
  },
  geometry: {
    type: PolygonSchema,
    index: '2dsphere'
  }
});

module.exports = {
  City: mongoose.model('City', CitySchema),
  CitySchema,
};