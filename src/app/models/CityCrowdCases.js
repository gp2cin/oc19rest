//Only crowd cases
const mongoose = require('../../services/database');

const CityCrowdCasesSchema = new mongoose.Schema({
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
    state: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'State'
    },
    updated_at: {
        type: Date,
        required: true,
    },
});

module.exports = {
    CityCrowdCases: mongoose.model('CityCrowdCases', CityCrowdCasesSchema),
    CityCrowdCasesSchema,
};