const cron = require('node-cron');
const moment = require('moment');

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
      console.log(`Google Spreadsheet: World sheet created at ${update}`);
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

      console.log(`Google Spreadsheet: Country data created at ${update}`);
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
      console.log(`Google Spreadsheet: State data created at ${update}`);
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
    for (let c in cities_cases) {
      const city = await City.findOne({ name_ca: cities_cases[c].city });
      if (city) cities_cases[c].city = city._id;
    }

    if (model) {
      await CityOfficialCases.updateMany(cities_cases)
      console.log(`Google Spreadsheet: Cities Official Cases updated at ${update}`);
    } else {
      await CityOfficialCases.insertMany(cities_cases);
      console.log(`Google Spreadsheet: Cities Official Cases created at ${update}`);
    }
  } catch (e) {
    console.log(e);
  };
};

//atualiza a cada dia ou a cada hora
const update = cron.schedule(
  '0 * * * * *', //lembrar de alterar: att por dia - '0 0 0 * * *' ou  att por hora - '0 0 * * * *'
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