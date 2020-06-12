const mongoose = require('../../services/database');
require('mongoose-type-email');
const bcrypt = require('bcryptjs');
const { IndividualSchema } = require('./Individual');
const { RoleSchema } = require('./Role');
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      uppercase: true,
      required: true
    },
    role: RoleSchema,
    email: {
      type: mongoose.SchemaTypes.Email,
      unique: true,
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
      select: false,
      required: true
    },
    password_token: {
      type: String,
      select: false,
    },
    password_token_created_at: {
      type: Date,
      select: false,
    },
    individual: IndividualSchema,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    lastSignedIn: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

module.exports = {
  User: mongoose.model('User', UserSchema),
  UserSchema,
};
