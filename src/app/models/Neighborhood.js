//Only crowd cases
const mongoose = require('../../services/database');
const { PolygonSchema } = require('./utils/Polygon')

const NeighborhoodSchema = new mongoose.Schema(
    {
        name_ca: {
            type: String,
            require: true
        },
        name: {
            type: String,
            require: true
        },
        city: {
            type: String
        },
        geometry: {
            type: PolygonSchema,
        }
    }
);

module.exports = {
    Neighborhood: mongoose.model('Neighborhood', NeighborhoodSchema),
    NeighborhoodSchema,
};