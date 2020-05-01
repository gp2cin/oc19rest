const cron = require('node-cron');
const moment = require('moment');

const dotenv = require('dotenv');
dotenv.config();

const AccessSpreadsheet = require('./accessSpreadsheet');

const { World } = require('../app/models/World');
const { State } = require('../app/models/State');
const { Country } = require('../app/models/Country');
const { CityOfficialCases } = require('../app/models/CityOfficialCases')

//atualiza a cada dia
const update = cron.schedule(
  '0 * * * * *',
  async () => {
    const ocovid_doc = await AccessSpreadsheet(process.env.OCOVID19_SHEETS_URL)
    const irrd_doc = await AccessSpreadsheet(process.env.IRRD_SHEETS_URL);
    const world_sheet = irrd_doc.world;
    const country_sheet = irrd_doc.country;
    const state_sheet = irrd_doc.state;

    const world_model = await World.findOne({ updated_at: world_sheet.updated_at });
    const country_model = await Country.findOne({ updated_at: country_sheet.updated_at });
    const state_model = await State.findOne({ updated_at: state_sheet.updated_at });

    try {
      if (!world_model) {
        const record = await World.create(world_sheet);
        await record.save();

        const ocovid_sheet = ocovid_doc.sheetsByIndex[0]
        world_sheet.updated_at = moment(world_sheet.updated_at).format('DD/MM/YYYY')
        await ocovid_sheet.addRow(world_sheet)

        console.log(`Google Spreadsheet: World sheet updated at ${world_sheet.updated_at}`);
      }
      if (!country_model) {
        const ocovid_sheet = ocovid_doc.sheetsByIndex[1]

        await Country.updateOne({ name: country_sheet.name }, country_sheet);
        country_sheet.updated_at = moment(country_sheet.updated_at).format('DD/MM/YYYY')
        await ocovid_sheet.addRow(country_sheet)

        console.log(`Google Spreadsheet: Country sheet updated at ${country_sheet.updated_at}`);
      }
      if (!state_model) {
        const ocovid_sheet = ocovid_doc.sheetsByIndex[2]
        const city_sheet = ocovid_doc.sheetsById[3]
        const { cities } = state_sheet
        const cities_array = cities

        for (let c in cities) {
          const { _id } = await State.findOne({ name: cities[c].state })
          cities[c].state = _id
          cities_array[c] = cities_array[c].updated_at = moment(cities_array[c].updated_at).format('DD/MM/YYYY')
          await CityOfficialCases.updateOne({ name: cities[c].name }, cities[c])
        }

        await State.updateOne({ name: state_sheet.name }, state_sheet)
        state_sheet.updated_at = moment(state_sheet.updated_at).format('DD/MM/YYYY')

        await ocovid_sheet.addRow(state_sheet)
        await city_sheet.addRows(cities_array)

        console.log(`Google Spreadsheet: State sheet updated at ${state_sheet.updated_at}`);
      } else {
        console.log('Google Spreadsheet: Everything is updated');
      }
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

