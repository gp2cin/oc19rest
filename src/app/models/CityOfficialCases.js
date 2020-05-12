const mongoose = require('../../services/database');

const CityOfficialCasesSchema = new mongoose.Schema(
    {
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
        city: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'City'
        },
        updatedAt: {
            type: Date,
            required: true,
        },
    }
);
module.exports = {
    CityOfficialCases: mongoose.model('CityOfficialCases', CityOfficialCasesSchema),
    CityOfficialCasesSchema,
};