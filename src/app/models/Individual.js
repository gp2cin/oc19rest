const mongoose = require('../../services/database');
const { PhoneSchema } = require('./Phone');
const { AddressSchema } = require('./Address');
const { DocumentSchema } = require('./Document');
const { AllergySchema } = require('./Allergy');
const { MedicineSchema } = require('./Medicine');
const { DiseasesSchema } = require('./Diseases');

const IndividualSchema = new mongoose.Schema(
  {
    gender: {
      type: String,
      enum: ['FEMALE', 'MALE', 'OTHER'],
      default: 'OTHER',
    },
    birthdate: {
      type: Date,
    },
    death_date: {
      type: Date,
    },
    age: {
      type: Number,
    },
    name: {
      type: String,
    },
    photo: {
      type: String,
    },
    diseases: DiseasesSchema,
    allergies: [AllergySchema],
    documents: [DocumentSchema],
    phones: [PhoneSchema],
    addresses: [AddressSchema],
    medicines: [MedicineSchema],
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
  IndividualSchema,
  Individual: mongoose.model('Individual', IndividualSchema),
};
