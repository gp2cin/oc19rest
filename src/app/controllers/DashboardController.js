const { GeneralObservation } = require('../models/GeneralObservation');
const { User } = require('../models/User');
const { Warning } = require('../models/Warning');
const { ObserverReport } = require('../models/ObserverReport');
const { Role } = require('../models/Role');

const db_query = async (observerType, neighborhood, city) => {
  let query = [];
  let params = { active: true };

  if (neighborhood && city) {
    params = { ...params, neighborhood_name: neighborhood, city };
  } else if (neighborhood) {
    params = { ...params, neighborhood_name: neighborhood };
  } else if (city) {
    params = { ...params, city };
  }

  switch (observerType) {
    case 'Observações em Gerais':
      query = await GeneralObservation.find(params);
      break;

    case 'Observações em Lote':
      params = { ...params, report_type: 'social' };
      query = await ObserverReport.find(params);
      break;

    case 'Observações Individuais':
      params = { ...params, report_type: 'individual' };
      query = await ObserverReport.find(params);
      break;

    case 'Auto Casos':
      query = await Warning.find(params);
      break;

    default:
      const generalObservations = await GeneralObservation.find(params);
      const observerReports = await ObserverReport.find(params);
      const warnings = await Warning.find(params);

      query = generalObservations.concat(observerReports, warnings);
      break;
  }

  return query;
};

const DashboardController = {
  statistics: async (req, res) => {
    try {
      const warnings = await Warning.countDocuments({ active: true });
      const generalObservations = await GeneralObservation.countDocuments({ active: true });
      const observerReports = await ObserverReport.countDocuments({ active: true });
      const commons = await Role.countDocuments({ name: 'COMMON' });
      const observers = await Role.countDocuments({ name: 'OBSERVER' });

      res.status(200).send({ commons, observers, generalObservations, warnings, observerReports });
    } catch (error) {
      res.status(500).send(error);
    }
  },

  filters: async (req, res) => {
    const { agentType, observerType, neighborhood, city } = req.query;
    let list = [];

    try {
      const users = await User.find();
      const query = await db_query(observerType, neighborhood, city);

      let observers = [];
      users.map((user) => {
        if (user.role.name === 'OBSERVER') {
          observers.push(user.email);
        }
      });

      if (agentType === 'Observador') {
        list = query.filter((elem) => observers.indexOf(elem.observer_email) !== -1);
      } else if (agentType === 'Indivíduo') {
        list = query.filter((elem) => observers.indexOf(elem.observer_email) === -1);
      } else {
        list = query;
      }
      res.status(200).send(list);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
};

module.exports = DashboardController;
