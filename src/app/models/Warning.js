const mongoose = require('../../services/database');
const { SymptomsSchema } = require('./Symptoms');
const { DiseasesSchema } = require('./Diseases');
const { AddressSchema } = require('./Address');
const WarningSchema = new mongoose.Schema(
  {
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
