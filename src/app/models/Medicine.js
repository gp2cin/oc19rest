const mongoose = require('../../services/database');

const MedicineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    componentes: [
      {
        type: String,
      },
    ],
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
  Medicine: mongoose.model('Medicine', MedicineSchema),
  MedicineSchema,
};
