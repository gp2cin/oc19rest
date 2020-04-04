const mongoose = require('../../services/database');

const DiseasesSchema = new mongoose.Schema(
  {
    individual: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Individual',
    },
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
  Diseases: mongoose.model('Diseases', DiseasesSchema),
  DiseasesSchema,
};
