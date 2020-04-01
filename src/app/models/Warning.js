const mongoose = require('../../services/database');
const { AddressSchema } = require('./Address');
const WarningSchema = new mongoose.Schema(
  {
    whistleblower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    reported: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    address: AddressSchema,

    active: {
      type: Boolean,
      default: true,
      select: false
    }
  },
  {
    timestamps: true
  }
);
module.exports = {
  Warning: mongoose.model('Warning', WarningSchema),
  WarningSchema
};
