const mongoose = require('../../services/database');
const bcrypt = require('bcryptjs');
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const { IndividualSchema } = require('./Individual');
const UserSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
      match: [emailRegex, 'Please enter a valid email address'],
    },
    password: {
      type: String,
      select: false,
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
