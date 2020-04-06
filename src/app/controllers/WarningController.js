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
        await user.save();
        userId = user._id;
      } else {
        userId = searchUser._id;
      }
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
  list: async (req, res) => {
    try {
      lmt = 20;
      ofst = 0; // tamanho da página
      pg = 1;
      const { page, limit, offset } = req.query;
      if (limit) {
        lmt = limit;
      }
      if (offset) {
        ofst = offset;
      }
      if (page) {
        ofst = (parseInt(page) - 1) * limit;
      }

      const count = await Warning.count({
        active: true,
      });

      const warnings = await Warning.find({
        active: true,
      })
        .limit(lmt)
        .skip(offset);
      if (warnings)
        res.status(200).send({
          warnings,
          pagination: {
            count,
            pages: Math.ceil(count / lmt),
            page: parseInt(page),
          },
        });
    } catch (e) {
      res.status(400).send(e);
    }
  },
  map: async (req, res) => {
    try {
      const { radius, lat, lng } = req.query;
      const warnings = await Warning.find({
        active: true,
        'address.location': {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [lat, lng],
            },
            $maxDistance: radius * 1000,
          },
        },
      });
      if (warnings) res.status(200).send(warnings);
    } catch (e) {
      res.status(400).send(e);
    }
  },
};

module.exports = WarningController;
