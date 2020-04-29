const cron = require('node-cron');

const dotenv = require('dotenv');
dotenv.config();

const AccessSpreadsheet = require('./accessSpreadsheet');

const { World } = require('../app/models/World');
const { State } = require('../app/models/State');
const { Country } = require('../app/models/Country');

//atualiza a cada dia
const update = cron.schedule(
  '0 * * * * *',
  async () => {
    const doc = await AccessSpreadsheet(process.env.IRRD_SHEETS_URL);
    const world_sheet = doc.world;
    const country_sheet = doc.country;
    const state_sheet = doc.state;

    const world_model = await World.findOne({ updated_at: world_sheet.updated_at });
    const country_model = await Country.findOne({ updated_at: country_sheet.updated_at });
    const state_model = await State.findOne({ updated_at: state_sheet.updated_at });

    try {
      if (!world_model) {
        const record = await World.create(world_sheet);
        await record.save();
        console.log(`Google Spreadsheet: World sheet updated at ${world_sheet.updated_at.toUTCString()}`);
      }
      if (!country_model) {
        const record = await Country.create(country_sheet);
        await record.save();
        console.log(`Google Spreadsheet: Country sheet updated at ${country_sheet.updated_at.toUTCString()}`);
      }
      if (!state_model) {
        const { name, suspects, confirmed, recovered, deaths, active, lethality_percentage, mortality_100k, updated_at } = state_sheet;
        const state_record = await State.create({
          name,
          suspects,
          confirmed,
          recovered,
          deaths,
          active,
          lethality_percentage,
          mortality_100k,
          updated_at,
        });
        await state_record.save();

        console.log(`Google Spreadsheet: State sheet updated at ${state_sheet.updated_at.toUTCString()}`);
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
