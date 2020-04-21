const mongoose = require('../../services/database');

const PrivilegeSchema = new mongoose.Schema(
  {
    name: {
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
  Privilege: mongoose.model('Privilege', PrivilegeSchema),
  PrivilegeSchema
};
