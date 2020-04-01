const mongoose = require('../../services/database');

const AddressSchema = new mongoose.Schema(
  {
    // individual: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Individual'
    // },
    // bess: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Bess'
    // },
    addressline1: {
      type: String
    },
    addressline2: {
      type: String
    },
    throughfare: {
      type: String
    },
    subThroughfare: {
      type: String
    },
    administrativeArea: {
      type: String
    },
    subAdministrativeArea: {
      type: String
    },
    locality: {
      type: String
    },
    subLocality: {
      type: String
    },
    postalCode: {
      type: String
    },
    country: {
      type: String
    },
    isoCode: {
      type: String,
      uppercase: true
    },
    timezone: {
      type: String
    },
    location: {
      type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ['Point'], // 'location.type' must be 'Point'
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    },
    active: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);
module.exports = {
  Address: mongoose.model('Address', AddressSchema),
  AddressSchema
};
