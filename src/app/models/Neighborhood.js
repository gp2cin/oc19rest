//Only crowd cases
const mongoose = require('../../services/database');
const { PolygonSchema } = require('./utils/Polygon')

const NeighborhoodSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            required: true
        },
        properties: {
            name_ca: {
                type: String,
                require: true
            },
            name: {
                type: String,
                require: true
            },
            city: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Cities'
            },
        },
        geometry: {
            type: PolygonSchema,
            index: '2dsphere'
        }
    }
);

module.exports = {
    Neighborhood: mongoose.model('Neighborhood', NeighborhoodSchema),
    NeighborhoodSchema,
};