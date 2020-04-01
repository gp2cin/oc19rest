const mongoose = require('../../services/database');
const { PhoneSchema } = require('./Phone');
const { AddressSchema } = require('./Address');
const { DocumentSchema } = require('./Document');
const IndividualSchema = new mongoose.Schema(
  {
    gender: {
      type: String,
      enum: ['FEMALE', 'MALE', 'OTHER'],
      default: 'OTHER'
    },
    birthdate: {
      type: Date
    },
    deathdate: {
      type: Date
    },
    photo: {
      type: String
    },
    documents: [DocumentSchema],
    phones: [PhoneSchema],
    addresses: [AddressSchema],
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
  IndividualSchema,
  Individual: mongoose.model('Individual', IndividualSchema)
};
