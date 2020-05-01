const mongoose = require('../../services/database');
const { IndividualSchema } = require('./Individual');

const ObserverReportSchema = new mongoose.Schema({
    whistleblower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        select: false,
    },
    city: {
        type: String,
    },
    neighborhood: {
        type: String,
    },
    report_type: {
        type: String,
    },
    case_type: {
        typr: String,
    },
    case_individual: IndividualSchema,
    household_contact_confirmed_case: {
        type: Boolean,
    },
    info_source: {
        type: String,
    },
    info_source_link: {
        type: String,
    },
    general_comments: {
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
    ObserverReportSchema,
    ObserverReport: mongoose.model('ObserverReport', ObserverReportSchema),
}