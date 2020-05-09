const mongoose = require('../../../services/database');

const PolygonSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: ['Polygon', 'MultiPolygon'],
            default: 'Polygon',
            require: true
        },
        coordinates: {
            type: [],
            required: true
        }
    }
);

module.exports = {
    Polygon: mongoose.model('Polygon', PolygonSchema),
    PolygonSchema,
};