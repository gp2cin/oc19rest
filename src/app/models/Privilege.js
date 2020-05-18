const mongoose = require('../../services/database');

const PrivilegeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      enum: ['ADMIN', 'COMMON', 'OBSERVER'],
      default: 'COMMON',
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
