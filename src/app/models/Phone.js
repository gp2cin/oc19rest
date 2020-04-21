const mongoose = require('../../services/database');

const PhoneSchema = new mongoose.Schema(
  {
    number: {
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
  Phone: mongoose.model('Phone', PhoneSchema),
  PhoneSchema,
};
