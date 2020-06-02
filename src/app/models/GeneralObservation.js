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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        select: false,
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
    image_url: {
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