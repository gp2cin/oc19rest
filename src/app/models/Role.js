const mongoose = require('../../services/database');

const { PrivilegeSchema } = require('./Privilege');
const RoleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      enum: ['ADMIN', 'OBSERVER', 'COMMON', 'ANALYST'],
      default: 'COMMON',
    },
    privileges: [PrivilegeSchema],
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
  Role: mongoose.model('Role', RoleSchema),
  RoleSchema
};
