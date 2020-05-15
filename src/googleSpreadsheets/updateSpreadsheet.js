const cron = require('node-cron');
const moment = require('moment');

const dotenv = require('dotenv');
dotenv.config();

const AccessSpreadsheet = require('./accessSpreadsheet');

const { World } = require('../app/models/World');
const { City } = require('../app/models/City');
const { Country } = require('../app/models/Country');
const { CityOfficialCases } = require('../app/models/CityOfficialCases');
const { State } = require('../app/models/State')

async function updateWorldData(sheets) {
  let sheet = sheets.world;
  let model = await World.find();
  let update = moment(sheet.updatedAt).format('DD/MM/YYYY');

  try {
    if (!model) {
      const record = await World.create(sheet);
      await record.save();
      console.log(`Google Spreadsheet: World sheet created at ${moment().format('DD/MM/YYYY')}`);
    } else {
      model = await World.findOne({ updatedAt: sheet.updatedAt })
      if (!model) {
        const record = await World.create(sheet);
        await record.save();
        console.log(`Google Spreadsheet: World data updated at ${update}`);
      };
    };
  } catch (e) {
    console.log(e);
  };
};

async function updateCountryData(sheets) {
  let sheet = sheets.country;
  let model = await Country.findOne();
  let update = moment(sheet.updatedAt).format('DD/MM/YYYY');

  try {
    if (!model) {
      const record = await Country.create(sheet);
      await record.save();

      console.log(`Google Spreadsheet: Country data created at ${moment().format('DD/MM/YYYY')}`);
    } else {
      model = await Country.findOne({ updatedAt: sheet.updatedAt });
      if (!model) {
        await Country.updateOne({ name: sheet.name }, sheet);
        console.log(`Google Spreadsheet: Country data updated at ${update}`);
      };
    };
  } catch (e) {
    console.log(e);
  };
};

async function updateStateData(sheets) {
  let sheet = sheets.state;
  let model = await State.findOne();
  let update = moment(sheet.updatedAt).format('DD/MM/YYYY');

  try {
    if (model) {
      model = await State.findOne({ updatedAt: sheet.updatedAt });
      if (!model) {
        await updateCitiesData(sheet);
        await State.updateOne({ name: sheet.name }, sheet);
        console.log(`Google Spreadsheet: State data updated at ${update}`);
      };
    } else {
      const record = await State.create(sheet);
      await record.save();
      await updateCitiesData(sheet);
      console.log(`Google Spreadsheet: State data created at ${moment().format('DD/MM/YYYY')}`);
    };
  } catch (e) {
    console.log(e);
  };
};

async function updateCitiesData(sheet) {
  let model = await CityOfficialCases.findOne();
  let cities_cases = sheet.cities_cases;
  let update = moment(sheet.updatedAt).format('DD/MM/YYYY');

  try {
    if (model) {
      for (let c in cities_cases) {
        const city = await City.findOne({ name_ca: cities_cases[c].city });
        if (city) {
          cities_cases[c].city = city._id;
          await CityOfficialCases.updateOne({ city: cities_cases[c].city }, {
            confirmed: cities_cases[c].confirmed,
            recovered: cities_cases[c].recovered,
            deaths: cities_cases[c].deaths,
            active: cities_cases[c].active,
            updatedAt: cities_cases[c].updatedAt
          });
        }
      }
      console.log(`Google Spreadsheet: Cities Official Cases updated at ${update}`);
    } else {
      for (let c in cities_cases) {
        const city = await City.findOne({ name_ca: cities_cases[c].city });
        if (city) cities_cases[c].city = city._id;
      }
      await CityOfficialCases.insertMany(cities_cases);
      console.log(`Google Spreadsheet: Cities Official Cases created at ${moment().format('DD/MM/YYYY')}`);
    }
  } catch (e) {
    console.log(e);
  };
};

//atualiza a cada dia ou a cada hora
const update = cron.schedule(
  process.env.CRON_TIMER, //lembrar de alterar: att por dia - '0 0 0 * * *' ou  att por hora - '0 0 * * * *'
  async () => {
    const irrd_doc = await AccessSpreadsheet();

    try {
      await updateWorldData(irrd_doc);
      await updateCountryData(irrd_doc);
      await updateStateData(irrd_doc);
    } catch (e) {
      console.log(e);
    }
  },
  {
    scheduled: true,
    timezone: 'America/Sao_Paulo',
  }
);

module.exports = update;