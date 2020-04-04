const moment = require('moment');

const { User } = require('../models/User');
const { Warning } = require('../models/Warning');
const { Address } = require('../models/Address');
const { Individual } = require('../models/Individual');

const WarningController = {
  store: async (req, res) => {
    try {
      const {
        email,
        body_temperature,
        fever,
        runny_nose,
        sutuffy_nose,
        breathlessness,
        cough,
        headache,
        body_ache,
        sore_throat,
        bellyache,
        diarrhea,
        malaise,
        pain_level,
        took_medicine,
        better,
        birthdate,
        gender,
        address,
      } = req.body;
      if (!email) res.status(400).send({ message: 'Email is not found.' });
      const searchUser = await User.findOne({ email });
      let userId = undefined;
      if (!searchUser) {
        const password = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const user = await User.create({ password, email, active: true });
        const individual = await Individual.create({
          gender: ['MALE', 'FEMALE'].includes(gender.toUpperCase()) ? gender : 'OTHER',
          birthdate: moment(birthdate),
        });
        user.individual = individual;
        console.log(user._id);
        await user.save();
        console.log(user._id);
        userId = user._id;
      } else {
        userId = searchUser._id;
      }
      console.log(address);
      const addrss = await Address.create(address);
      const warning = await Warning.create({
        body_temperature,
        fever,
        runny_nose,
        sutuffy_nose,
        breathlessness,
        cough,
        headache,
        body_ache,
        sore_throat,
        bellyache,
        diarrhea,
        malaise,
        pain_level,
        took_medicine,
        better,
      });
      warning.whistleblower = userId;
      warning.reported = userId;
      warning.address = addrss;
      warning.save();
      warning.whistleblower = undefined;
      warning.reported = undefined;
      if (warning) {
        res.status(201).send({
          message: 'Created successfully',
          warning,
        });
      }
    } catch (e) {
      console.log(e);
      res.status(400).send(e);
    }
  },
  list: (req, res) => {
    try {
      const { radius, lat, lng } = req.params;
      console.log(radius, lat, lng);
    } catch (e) {
      console.log(e);
      res.status(400).send(e);
    }
  },
  map: async (req, res) => {
    try {
      const { radius, lat, lng } = req.query;
      console.log(radius, lat, lng);
      const warnings = await Warning.find({
        address: {
          location: {
            $geoWithin: {
              $nearSphere: {
                $geometry: {
                  type: 'Point',
                  coordinates: [lat, lng],
                },
                $maxDistance: 100000000000000000000000 * 100000000000000000000000,
              },
            },
          },
        },
      });
      console.log(warnings);
      if (warnings) res.status(200).send(warnings);
    } catch (e) {
      console.log(e);
      res.status(400).send(e);
    }
  },
};

module.exports = WarningController;
