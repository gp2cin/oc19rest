const mongoose = require('../../services/database');

const GeneralObservationSchema = new mongoose.Schema({
    city: {
        type: String,
    },
    observer_name: {
        type: String,
    },
    observer_email: {
        type: String,
    },
    neighborhood: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Neighborhood',
        select: false,
    },
    neighborhood_name: {
        type: String,
    },
    report_type: {
        type: String,
    },
    observation: {
        type: String,
    },
    active: {
        type: Boolean,
        default: true,
        select: false,
    },
}, {
    timestamps: true,
}
);

module.exports = {
    GeneralObservationSchema,
    GeneralObservation: mongoose.model('GeneralObservation', GeneralObservationSchema),
}