const mongoose = require('../../services/database');

const SymptomsSchema = new mongoose.Schema(
  {
    body_temperature: {
      type: Number,
      required: true
    },
    fever: {
      type: Boolean,
      default: false
    },
    runny_nose: {
      type: Boolean,
      default: false
    },
    sutuffy_nose: {
      type: Boolean,
      default: false
    },
    breathlessness: {
      type: Boolean,
      default: false
    },
    cough: {
      type: Boolean,
      default: false
    },
    headache: {
      type: Boolean,
      default: false
    },
    body_ache: {
      type: Boolean,
      default: false
    },
    sore_throat: {
      type: Boolean,
      default: false
    },
    bellyache: {
      type: Boolean,
      default: false
    },
    diarrhea: {
      type: Boolean,
      default: false
    },
    malaise: {
      type: Boolean,
      default: false
    },
    pain_level: {
      type: Number
    },
    took_medicine: {
      type: Boolean,
      default: false
    },
    better: {
      type: Boolean
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
  Symptoms: mongoose.model('Symptoms', SymptomsSchema),
  SymptomsSchema
};
