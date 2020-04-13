const mongoose = require('../../services/database');

const CitySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        suspects: {
            type: Number,
            required: true,
        },
        confirmed: {
            type: Number,
            required: true,
        },
        recovered: {
            type: Number,
            required: true,
        },
        deaths: {
            type: Number,
            required: true,
        },
        active: {
            type: Number,
            required: true,
        },
        total: {
            type: Number,
            required: true,
        },
        uf: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'State'
        },
    }
);

module.exports = {
    City: mongoose.model('City', CitySchema),
    CitySchema
}