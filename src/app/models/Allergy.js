const mongoose = require('../../services/database');

const AllergySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
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
  Allergy: mongoose.model('Allergy', AllergySchema),
  AllergySchema,
};
