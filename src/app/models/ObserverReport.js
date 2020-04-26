const mongoose = require('../../services/database');
const { DiseasesSchema } = require('./Diseases');

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
    case_individual: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Individual',
        select: false,
    },
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
    }
});

module.exports = {
    ObserverReportSchema,
    ObserverReport: mongoose.model('ObserverReport', ObserverReportSchema),
}