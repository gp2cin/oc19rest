const moment = require('moment');

const { User } = require('../models/User');
const { Warning } = require('../models/Warning');
const { Address } = require('../models/Address');
const { Individual } = require('../models/Individual');
const { Diseases } = require('../models/Diseases');
const { Symptoms } = require('../models/Symptoms');
const { Neighborhood } = require('../models/Neighborhood');
const { City } = require('../models/City');

const WarningController = {
  store: async (req, res) => {
    try {
      const {
        email,
        symptoms,
        city,
        city_ca,
        neighborhood,
        neighborhood_name,
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
      if (city_ca) {
        const searchCity = await City.findOne({ name_ca: city_ca });
        if (searchCity) {
          cityId = searchCity._id;
        } else {
          console.log('City not found');
        }
      }
      const diseass = await Diseases.create(diseases);
      const symp = await Symptoms.create(symptoms);
      const warning = await Warning.create({});
      //warning.whistleblower = userId;
      //warning.reported = userId;
      warning.whistleblowerEmail = email;
      warning.city = city;
      warning.city_mongo_id = cityId;
      warning.neighborhood_name = neighborhood_name;
      warning.neighborhood = neighborhoodId;
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
      let warngs = warnings.map((warning) => {
        let total = 1;
        if (warning.symptoms) {
          const {
            fever,
            runny_nose,
            breathlessness,
            dry_cough,
            cough,
            headache,
            muscle_weakness_or_pain,
            sputum_production,
            sore_throat,
            diarrhea,
            stuffy_nose,
            red_eyes,
            dificulty_swallowing,
            chills,
            body_red_spots,
            nausea,
            vomiting,
            lack_of_appeti,
          } = warning.symptoms;

          if (fever) {
            total = total + 5;
          }
          if (runny_nose) {
            total = total + 1;
          }
          if (breathlessness) {
            total = total + 10;
          }
          if (dry_cough || cough) {
            total = total + 3;
          }
          if (headache) {
            total = total + 1;
          }
          if (muscle_weakness_or_pain) {
            total = total + 1;
          }
          if (sputum_production) {
            total = total + 1;
          }
          if (sore_throat) {
            total = total + 1;
          }
          if (diarrhea) {
            total = total + 1;
          }
          if (stuffy_nose) {
            total = total + 1;
          }
          if (red_eyes) {
            total = total + 1;
          }
          if (dificulty_swallowing) {
            total = total + 1;
          }
          if (chills) {
            total = total + 1;
          }
          if (body_red_spots) {
            total = total + 1;
          }
          if (nausea) {
            total = total + 1;
          }
          if (vomiting) {
            total = total + 1;
          }
          if (lack_of_appeti) {
            total = total + 1;
          }
        }
        if (
          warning.contact_suspect_or_confirmed_case ||
          warning.household_contact_confirmed_case ||
          warning.been_in_health_unit
        ) {
          total = total + 10;
        }
        return [warning.address.location.coordinates[0], warning.address.location.coordinates[1], total];
      });

      if (warnings) res.status(200).send(warngs);
    } catch (e) {
      res.status(400).send(e);
    }
  },
};

module.exports = WarningController;
