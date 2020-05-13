//Only crowd cases
const mongoose = require('../../services/database');
const { PolygonSchema } = require('./utils/Polygon')

const NeighborhoodSchema = new mongoose.Schema(
    {
        name_ca: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        city: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'City',
        },
        location: PolygonSchema
    }
);

module.exports = {
    Neighborhood: mongoose.model('Neighborhood', NeighborhoodSchema),
    NeighborhoodSchema,
};