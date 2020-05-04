const mongoose = require('mongoose');

const PolygonSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: ['Polygon', 'MultiPolygon'],
            default: 'Polygon',
            require: true
        },
        coordinates: {
            type: [[[Number]]],
            required: true
        }
    }
);

module.exports = {
    Polygon: mongoose.model('Polygon', PolygonSchema),
    PolygonSchema
};