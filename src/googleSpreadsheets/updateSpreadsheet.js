const cron = require('node-cron');
const moment = require('moment');

const dotenv = require('dotenv');
dotenv.config();

const AccessSpreadsheet = require('./accessSpreadsheet');

const { World } = require('../app/models/World');
const { State } = require('../app/models/State');
const { Country } = require('../app/models/Country');
const { CityOfficialCases } = require('../app/models/CityOfficialCases')

async function updateWorldData(irrd, ocovid) {
  let sheet = irrd.world;
  let model = await World.find();

  try {
    if (!model) {
      const record = await World.create(sheet);
      await record.save();

      sheet.updatedAt = moment(sheet.updatedAt).format('DD/MM/YYYY')
      console.log(`Google Spreadsheet: World sheet updated at ${sheet.updatedAt}`);
    } else {
      let ocovid_sheet = ocovid.sheetsByIndex[0];
      model = await World.findOne({ updatedAt: sheet.updatedAt })
      if (!model) {
        const record = await World.create(sheet);
        await record.save();

        sheet.updatedAt = moment(sheet.updatedAt).format('DD/MM/YYYY')
        const row = await ocovid_sheet.addRow(sheet)
        await row.save()

        console.log(`Google Spreadsheet: World data updated at ${sheet.updatedAt}`);
      }
    }
  } catch (e) {
    console.log(e)
  }
}

async function updateCountryData(irrd, ocovid) {
  let sheet = irrd.country;
  let model = await Country.findOne();

  try {
    if (!model) {
      const record = await Country.create(sheet);
      await record.save();

      sheet.updatedAt = moment(sheet.updatedAt).format('DD/MM/YYYY')

      console.log(`Google Spreadsheet: Country data updated at ${sheet.updatedAt}`);
    } else {
      let ocovid_sheet = ocovid.sheetsByIndex[1];
      model = await Country.findOne({ updatedAt: sheet.updatedAt })
      if (!model) {
        await Country.updateOne({ name: sheet.name }, sheet)

        sheet.updatedAt = moment(sheet.updatedAt).format('DD/MM/YYYY')
        const row = await ocovid_sheet.addRow(sheet)
        await row.save()

        console.log(`Google Spreadsheet: Country data updated at ${sheet.updatedAt}`);
      }
    }
  } catch (e) {
    console.log(e)
  }
}

async function updateStateData(irrd, ocovid) {
  let sheet = irrd.state;
  let { cities } = sheet
  let model = await State.findOne();

  try {
    if (!model) {
      const record = await State.create(sheet);
      await record.save();

      for (let c in cities) {
        cities[c].state = record._id
      }
      await CityOfficialCases.insertMany(cities)

      sheet.updatedAt = moment(sheet.updatedAt).format('DD/MM/YYYY')
      console.log(`Google Spreadsheet: State data updated at ${sheet.updatedAt}`);
    } else {
      let ocovid_sheet = ocovid.sheetsByIndex[2];
      model = await State.findOne({ updatedAt: sheet.updatedAt })
      if (!model) {
        await State.updateOne({ name: sheet.name }, sheet)
        await writeCitiesData(cities, ocovid)

        for (let c in cities) {
          await CityOfficialCases.updateOne({ name: cities[c].name }, {
            suspects: cities[c].suspects,
            confirmed: cities[c].confirmed,
            recovered: cities[c].recovered,
            deaths: cities[c].deaths,
            active: cities[c].active,
            updatedAt: cities[c].updatedAt,
          })
        }

        sheet.updatedAt = moment(sheet.updatedAt).format('DD/MM/YYYY')
        console.log(`Google Spreadsheet: State data updated at ${sheet.updatedAt}`);

        const row = await ocovid_sheet.addRow(sheet)
        await row.save()
      }
    }
  } catch (e) {
    console.log(e)
  }
}

async function writeCitiesData(array, sheets) {
  let cities = array.slice()
  let sheet = sheets.sheetsByIndex[3];
  try {
    for (let c in cities) {
      cities[c].updatedAt = moment(cities[c].updatedAt).format('DD/MM/YYYY')
    }

    await sheet.addRows(cities)

  } catch (e) {
    console.log(e)
  }
}

//atualiza a cada dia ou a cada hora
const update = cron.schedule(
  '0 * * * * *', //lembrar de alterar: att por dia - '0 0 0 * * *' ou  att por hora - '0 0 * * * *'
  async () => {
    const ocovid_doc = await AccessSpreadsheet(process.env.OCOVID19_SHEETS_URL)
    const irrd_doc = await AccessSpreadsheet(process.env.IRRD_SHEETS_URL);

    try {
      await updateWorldData(irrd_doc, ocovid_doc)
      await updateCountryData(irrd_doc, ocovid_doc)
      await updateStateData(irrd_doc, ocovid_doc)

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

