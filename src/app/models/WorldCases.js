const mongoose = require('../../services/database');

const WorldSchema = new mongoose.Schema(
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
        updatedAt: {
            type: Date,
            required: true
        },
    }
);

module.exports = {
    World: mongoose.model('World', WorldSchema),
    WorldSchema
}