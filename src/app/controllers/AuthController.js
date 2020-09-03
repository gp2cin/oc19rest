const bcrypt = require('bcryptjs');
const { User } = require('../models/User');
// const mailer = require('../../modules/mailer');
const { Individual } = require('../models/Individual');
const { Role } = require('../models/Role');
const { Privilege } = require('../models/Privilege');
const { Address } = require('../models/Address');
const { Phones } = require('../models/Phone');
const { Neighborhood } = require('../models/Neighborhood');
const { City } = require('../models/City');
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
      console.log('HERE');
      await user.save();
      console.log('HERE2');
      user.password = undefined;
      res.status(200).send({ user, token: authMiddleware.generateToken({ id: user.id }) });
    } catch (e) {
      console.log('HERE3');
      console.log(e);
      res.status(400).send({ error: e });
    }
  }

  /*
   * Function to register and get token
   */
  async signUp(req, res) {
    const { password, name, email, gender, birthdate } = req.body;
    try {
      if (!(password || name || email)) {
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

        const user = await User.create({ password, name, role, email, active: true });
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
   * Function to register a new observer and get token
   */
  async signUpObserver(req, res) {
    const { password, name, email, gender, birthdate, city, neighborhood } = req.body;
    console.log(req.body);

    try {
      if (!(password || name || email)) {
        res.status(404).send({ error: 'Name, email and password are required.' });
      }
      const searchUser = await User.findOne({ email });
      if (searchUser) {
        res.status(400).send({ error: 'User alredy exists.' });
      } else {
        const privilege = await Privilege.create({
          name: 'OBSERVER',
        });
        const role = await Role.create({
          name: 'OBSERVER',
          privileges: [privilege],
        });

        let neighborhoodId = undefined;
        if (neighborhood) {
          const searchNeighborhood = await Neighborhood.findOne({ _id: neighborhood });
          if (searchNeighborhood) {
            neighborhoodId = searchNeighborhood._id;
          } else {
            console.log('Neighborhood not found');
          }
        }

        let cityId = undefined;
        if (city) {
          const searchCity = await City.findOne({ name_ca: city });
          if (searchCity) {
            cityId = searchCity._id;
          } else {
            console.log('City not found');
          }
        }

        const address = await Address.create({
          city: cityId,
          neighborhood: neighborhoodId,
          active: true
        });

        console.log('ADDRESS')
        console.log(address)

        const user = await User.create({ password, name, role, email, active: true });
        if (user) {
          const individual = await Individual.create({
            gender: gender ? (['MALE', 'FEMALE'].includes(gender.toUpperCase()) ? gender.toUpperCase() : 'OTHER') : 'OTHER',
            birthdate: moment(birthdate),
          });
          individual.createdAt = new Date();

          individual.address = address;

          individual.updateAt = new Date();
          user.individual = individual;
          await individual.save();

          await user.save();
          user.password = undefined;
          res.status(201).send({ user, token: authMiddleware.generateToken({ id: user.id }) });
        }
      }
    } catch (e) {
      console.log(e);

      res.status(400).send({
        message: 'Registration failed',
        error: e.errmsg
      });
    }
  }

  /*
   * Function to register a new analyst and get token
   */
  async signUpAnalyst(req, res) {
    const { password, name, email, gender, birthdate, city, neighborhood } = req.body;
    console.log(req.body);

    try {
      if (!(password || name || email)) {
        res.status(404).send({ error: 'Name, email and password are required.' });
      }
      const searchUser = await User.findOne({ email });
      if (searchUser) {
        res.status(400).send({ error: 'User alredy exists.' });
      } else {
        const privilege = await Privilege.create({
          name: 'ANALYST',
        });
        const role = await Role.create({
          name: 'ANALYST',
          privileges: [privilege],
        });

        let neighborhoodId = undefined;
        if (neighborhood) {
          const searchNeighborhood = await Neighborhood.findOne({ _id: neighborhood });
          if (searchNeighborhood) {
            neighborhoodId = searchNeighborhood._id;
          } else {
            console.log('Neighborhood not found');
          }
        }

        let cityId = undefined;
        if (city) {
          const searchCity = await City.findOne({ name_ca: city });
          if (searchCity) {
            cityId = searchCity._id;
          } else {
            console.log('City not found');
          }
        }

        const address = await Address.create({
          city: cityId,
          neighborhood: neighborhoodId,
          active: true
        });

        const user = await User.create({ password, name, role, email, active: true });
        if (user) {
          const individual = await Individual.create({
            gender: gender ? (['MALE', 'FEMALE'].includes(gender.toUpperCase()) ? gender.toUpperCase() : 'OTHER') : 'OTHER',
            birthdate: moment(birthdate),
          });
          individual.createdAt = new Date();

          individual.address = address;

          individual.updateAt = new Date();
          user.individual = individual;
          await individual.save();

          await user.save();
          user.password = undefined;
          res.status(201).send({ user, token: authMiddleware.generateToken({ id: user.id }) });
        }
      }
    } catch (e) {
      console.log(e);

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

  /*
   * Function to change password
   */
  async changePassword(req, res, next) {
    try {
      const { id } = req.decoded;
      const { password } = req.body;
      const user = await User.findOne({ _id: id });
      if (!user) res.status(404).send({ message: 'User not found.' });
      else {
        const hash = await bcrypt.hash(password, 10);
        await User.updateOne({ _id: id }, { password: hash });
        res.status(200).send({ message: 'Password changed' })
      }
    } catch (e) {
      res.status(400).send()
      console.log(e);
    }
  }
}

module.exports = new AuthController();
