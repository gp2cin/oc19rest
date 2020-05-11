const mongoose = require('../../services/database');
const { PolygonSchema } = require('./utils/Polygon');

const CitySchema = new mongoose.Schema(
  {
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
    geometry: {
      type: PolygonSchema,
    }
  }
);

module.exports = {
  City: mongoose.model('City', CitySchema),
  CitySchema,
};