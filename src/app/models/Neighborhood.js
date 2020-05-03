//Only crowd cases
const mongoose = require('../../services/database');

const NeighborhoodSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    suspects: {
        type: Number,
        required: true,
    },
    confirmed: {
        type: Number,
        required: true,
    },
    deaths: {
        type: Number,
        required: true,
    },
    city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City'
    },
    updatedAt: {
        type: Date,
        required: true,
    },
});

module.exports = {
    Neighborhood: mongoose.model('Neighborhood', NeighborhoodSchema),
    NeighborhoodSchema,
};