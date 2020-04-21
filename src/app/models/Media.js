const mongoose = require('../../services/database');

const MediaSchema = new mongoose.Schema(
  {
    individual: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Individual'
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
  Media: mongoose.model('Media', MediaSchema),
  MediaSchema
};
