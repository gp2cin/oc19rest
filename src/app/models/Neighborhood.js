//Only crowd cases
const mongoose = require('../../services/database');

const GeoSchema = new mongoose.Schema(
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

const NeighborhoodSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true
        },
        suspects: {
            type: Number,
            required: true
        },
        confirmed: {
            type: Number,
            required: true
        },
        deaths: {
            type: Number,
            required: true
        },
        city: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'City'
        },
        updatedAt: {
            type: Date,
            required: true
        },
        location: GeoSchema,
    }
);

module.exports = {
    Neighborhood: mongoose.model('Neighborhood', NeighborhoodSchema),
    NeighborhoodSchema,
};