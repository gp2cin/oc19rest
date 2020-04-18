const cron = require('node-cron');
const AccessSpreadsheet = require('./accessSpreadsheet');

const { World } = require('../app/models/WorldCases');
const { State } = require('../app/models/StateCases');
const { Country } = require('../app/models/CountryCases');

//atualiza a cada dia
const update = cron.schedule(
  '0 * * * * *',
  async () => {
    const doc = await AccessSpreadsheet();
    const world_sheet = doc.world;
    const country_sheet = doc.country;
    const state_sheet = doc.state;

    const world_model = await World.findOne({ updatedAt: world_sheet.updatedAt });
    const country_model = await Country.findOne({ updatedAt: country_sheet.updatedAt });
    const state_model = await State.findOne({ updatedAt: state_sheet.updatedAt });

    try {
      if (!world_model) {
        const { confirmed, deaths, newCases, newDeaths, updatedAt } = world_sheet;
        const record = await World.create({
          confirmed,
          deaths,
          newCases,
          newDeaths,
          updatedAt,
        });
        await record.save();
        console.log('Google Spreadsheet: World sheet updated at ', updatedAt.toUTCString());
      }
      if (!country_model) {
        const { confirmed, deaths, newCases, newDeaths, lethality_percentage, updatedAt } = country_sheet;
        const record = await Country.create({
          confirmed,
          deaths,
          newCases,
          newDeaths,
          lethality_percentage,
          updatedAt,
        });
        await record.save();
        console.log('Google Spreadsheet: Country sheet updated at ', updatedAt.toUTCString());
      }
      if (!state_model) {
        const {
          cities,
          suspects,
          confirmed,
          recovered,
          deaths,
          active,
          total,
          lethality_percentage,
          updatedAt,
        } = state_sheet;
        const record = await State.create({
          cities,
          suspects,
          confirmed,
          recovered,
          deaths,
          active,
          total,
          lethality_percentage,
          updatedAt,
        });
        await record.save();
        console.log('Google Spreadsheet: State sheet updated at ', updatedAt.toUTCString());
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
