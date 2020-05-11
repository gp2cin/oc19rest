const mongoose = require('../../services/database');
const { PolygonSchema } = require('./utils/Polygon');

const CitySchema = new mongoose.Schema(
  {
    name_ca: {
      type: String,
      required: true,
      lowercase: true
    },
    name: {
      type: String,
      required: true
    },
    state: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'State'
    },
    location: {
      type: PolygonSchema,
      index: '2dsphere'
    }
  }
);

module.exports = {
  City: mongoose.model('City', CitySchema),
  CitySchema,
};