const mongoose = require('../../services/database');

const DocumentSchema = new mongoose.Schema(
  {
    individual: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Individual'
    },
    code: {
      type: String,
      required: true
    },
    description: {
      type: String,
      enum: ['CPF', 'RG', 'PASSPORT', 'OTHER'],
      default: 'OTHER'
    },
    media: {
      type: String
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
  Document: mongoose.model('Document', DocumentSchema),
  DocumentSchema
};
