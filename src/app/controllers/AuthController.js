const bcrypt = require('bcryptjs');
const { User } = require('../models/User');
// const mailer = require('../../modules/mailer');
const { Individual } = require('../models/Individual');
const { Role } = require('../models/Role');
const { Privilege } = require('../models/Privilege');
const { Address } = require('../models/Address');
const { Phones } = require('../models/Phone');
const authMiddleware = require('../middleware/auth');
const moment = require('moment');

class AuthController {
  /*
   * Function to login with user
   */
  async signIn(req, res) {
    const { email, password } = req.body;
    try {
      // const user = await User.findOne({ $or: [{ email }, { username }] }).select('+password');
      const user = await User.findOne({ email }).select('+password');
      if (!user) res.status(400).send({ error: 'User not found.' });
      if (!(await bcrypt.compare(password, user.password))) res.status(400).send({ error: 'Invalid password' });

      user.lastSignedIn = new Date();
      await user.save();
      user.password = undefined;
      res.status(200).send({ user, token: authMiddleware.generateToken({ id: user.id }) });
    } catch (e) {
      console.log(e);
      res.status(400).send({ error: e });
    }
  }

  /*
   * Function to register and get token
   */
  async signUp(req, res) {
    const { password, first_name, last_name, email, gender, birthdate } = req.body;
    try {
      if (!(password || first_name || email)) {
        res.status(404).send({ error: 'First name, email and password are required.' });
      }
      const searchUser = await User.findOne({ email });
      if (searchUser) {
        res.status(400).send({ error: 'User alredy exists.' });
      } else {
        const privilege = await Privilege.create({
          name: 'COMMON',
        });
        const role = await Role.create({
          name: 'COMMON',
          privileges: [privilege],
        });
        const user = await User.create({ password, first_name, last_name, role, email, active: true });
        if (user) {
          const individual = await Individual.create({
            gender: gender ? (['MALE', 'FEMALE'].includes(gender.toUpperCase()) ? gender.toUpperCase() : 'OTHER') : 'OTHER',
            birthdate: moment(birthdate),
          });
          individual.createdAt = new Date();

          individual.updateAt = new Date();
          user.individual = individual;
          await individual.save();

          await user.save();
          user.password = undefined;
          res.status(201).send({ user, token: authMiddleware.generateToken({ id: user.id }) });
        }
      }
    } catch (e) {
      res.status(400).send({
        message: 'Registration failed',
        error: e.errmsg
      });
    }
  }

  /*
   * Function to retreive user info
   */

  async me(req, res, next) {
    const { id } = req.decoded;
    const user = await User.findOne({
      _id: id
    });
    if (!user) res.status(400).send({ message: 'User not found.' });
    // const individual = await Individual.findById(user.individual);

    // user.createdAt = undefined;
    // user.updatedAt = undefined;
    user.__v = undefined;
    // user.individual = individual;
    // if (individual) {
    //   const phones = await Phones.find({
    //     individual: user.individual
    //   });
    //   if (phones)
    //     user.individual.phones = phones.map(phone => {
    //       phone.individual = undefined;
    //       phone.createdAt = undefined;
    //       phone.updatedAt = undefined;
    //       phone.__v = undefined;
    //       return phone;
    //     });
    //   const addresses = await Address.find({
    //     individual: user.individual
    //   });
    //   if (addresses)
    //     user.individual.addresses = addresses.map(address => {
    //       address.individual = undefined;
    //       address.createdAt = undefined;
    //       address.updatedAt = undefined;
    //       address.__v = undefined;
    //       return address;
    //     });
    // }

    // individual._id = undefined;
    // individual.__v = undefined;
    // individual.createdAt = undefined;
    // individual.updatedAt = undefined;
    // individual.user = undefined;
    // user.besses = undefined;

    res.status(200).send(user);
  }
}

module.exports = new AuthController();
