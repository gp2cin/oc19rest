const mongoose = require('../../services/database');

const DiseasesSchema = new mongoose.Schema(
  {
    hypertensive: {
      type: Boolean,
    },
    diabetes: {
      type: Boolean,
    },
    heart_disease: {
      type: Boolean,
    },
    liver_disease: {
      type: Boolean,
    },
    neurological_disorders: {
      type: Boolean,
    },
    neuromuscular_disease: {
      type: Boolean,
    },
    immunodeficiency: {
      type: Boolean,
    },
    kidney_disease: {
      type: Boolean,
    },
    lung_disease: {
      type: Boolean,
    },
    HIV_infection: {
      type: Boolean,
    },
    neoplasm: {
      type: Boolean,
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
