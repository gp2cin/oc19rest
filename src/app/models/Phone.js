const mongoose = require('../../services/database');

const PhoneSchema = new mongoose.Schema(
  {
    individual: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Individual'
    },
    bess: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bess'
    },
    number: {
      type: String,
      required: true
    },
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
  Phone: mongoose.model('Phone', PhoneSchema),
  PhoneSchema
};
