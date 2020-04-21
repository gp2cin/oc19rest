const moment = require('moment');

const { User } = require('../models/User');
const { Warning } = require('../models/Warning');
const { Address } = require('../models/Address');
const { Individual } = require('../models/Individual');
const { Diseases } = require('../models/Diseases');
const { Symptoms } = require('../models/Symptoms');

const WarningController = {
  store: async (req, res) => {
    try {
      const {
        email,
        symptoms,
        birthdate,
        gender,
        address,
        diseases,
        covid_tested,
        covid_result,
        covid19_was_discarded,
        contact_suspect_or_confirmed_case,
        household_contact_confirmed_case,
        been_in_health_unit,
        had_evaluation_for_symptoms,
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
      const diseass = await Diseases.create(diseases);
      const symp = await Symptoms.create(symptoms);
      const warning = await Warning.create({});
      warning.whistleblower = userId;
      warning.reported = userId;
      warning.address = addrss;
      warning.diseases = diseass;
      warning.symptoms = symp;
      warning.covid_tested = covid_tested;
      warning.covid_result = covid_result;
      warning.covid19_was_discarded = covid19_was_discarded;
      warning.contact_suspect_or_confirmed_case = contact_suspect_or_confirmed_case;
      warning.household_contact_confirmed_case = household_contact_confirmed_case;
      warning.been_in_health_unit = been_in_health_unit;
      warning.had_evaluation_for_symptoms = had_evaluation_for_symptoms;
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
