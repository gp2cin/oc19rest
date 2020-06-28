const mongoose = require('../../services/database');
const { SymptomsSchema } = require('./Symptoms');
const { DiseasesSchema } = require('./Diseases');
const { AddressSchema } = require('./Address');
const WarningSchema = new mongoose.Schema(
  {
    whistleblowerEmai: {
      type: String,
    },
    whistleblower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      select: false,
    },
    reported: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      select: false,
    },
    phone: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Phone',
    },
    address: AddressSchema,
    symptoms: SymptomsSchema,
    approached: {
      type: Date,
    },
    covid_tested: {
      type: Boolean,
    },
    covid_result: {
      type: Boolean,
    },
    contact_suspect_or_confirmed_case: {
      type: Boolean,
    },
    household_contact_confirmed_case: {
      type: Boolean,
    },
    been_in_health_unit: {
      type: Boolean,
    },
    had_evaluation_for_symptoms: {
      type: Boolean,
    },
    covid19_was_discarded: {
      type: Boolean,
    },
    diseases: DiseasesSchema,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = {
  Warning: mongoose.model('Warning', WarningSchema),
  WarningSchema,
};
