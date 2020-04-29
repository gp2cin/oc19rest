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
        new_cases: {
            type: Number,
            required: true,
        },
        new_deaths: {
            type: Number,
            required: true,
        },
        lethality_percentage: {
            type: Number,
            required: true,
        },
        updated_at: {
            type: Date,
            required: true
        },
    }
);

module.exports = {
    Country: mongoose.model('Country', CountrySchema),
    CountrySchema
}