const mongoose = require('../../services/database');

const SymptomsSchema = new mongoose.Schema(
  {
    fever: {
      type: Boolean,
      default: false,
    },
    runny_nose: {
      type: Boolean,
      default: false,
    },
    stuffy_nose: {
      type: Boolean,
      default: false,
    },
    breathlessness: {
      type: Boolean,
      default: false,
    },
    dry_cough: {
      type: Boolean,
      default: false,
    },
    cough: {
      type: Boolean,
      default: false,
    },
    headache: {
      type: Boolean,
      default: false,
    },
    muscle_weakness_or_pain: {
      type: Boolean,
      default: false,
    },
    sputum_production: {
      type: Boolean,
      default: false,
    },
    sore_throat: {
      type: Boolean,
      default: false,
    },
    red_eyes: {
      type: Boolean,
      default: false,
    },
    diarrhea: {
      type: Boolean,
      default: false,
    },
    dificulty_swallowing: {
      type: Boolean,
      default: false,
    },
    chills: {
      type: Boolean,
      default: false,
    },
    body_red_spots: {
      type: Boolean,
      default: false,
    },
    nausea: {
      type: Boolean,
      default: false,
    },
    vomiting: {
      type: Boolean,
      default: false,
    },
    lack_of_appetite: {
      type: Boolean,
      default: false,
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
  Symptoms: mongoose.model('Symptoms', SymptomsSchema),
  SymptomsSchema,
};
