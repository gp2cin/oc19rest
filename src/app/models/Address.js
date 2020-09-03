const mongoose = require('../../services/database');

const AddressSchema = new mongoose.Schema(
  {
    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'City',
      select: false,
    },
    neighborhood: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Neighborhood',
      select: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = {
  Address: mongoose.model('Address', AddressSchema),
  AddressSchema,
};
