const mongoose = require('../../services/database');

const CountrySchema = new mongoose.Schema(
    {
        confirmed: {
            type: Number,
            required: true,
        },
        deaths: {
            type: Number,
            required: true,
        },
        newCases: {
            type: Number,
            required: true,
        },
        newDeaths: {
            type: Number,
            required: true,
        },
        lethality_percentage: {
            type: Number,
            required: true,
        },
        updatedAt: {
            type: Date,
            required: true
        },
    }
);

module.exports = {
    Country: mongoose.model('Country', CountrySchema),
    CountrySchema
}