const dotenv = require('dotenv');
dotenv.config();

const { GoogleSpreadsheet } = require('google-spreadsheet');

const StateSheet = require('./sheets/stateSheet');
const WorldSheet = require('./sheets/worldSheet');
const CountrySheet = require('./sheets/countrySheet');

const AccessSpreadsheet = async function () {
  //peganda a planilha usando a chave na URL
  const document = new GoogleSpreadsheet(process.env.IRRD_SHEETS_URL);

  //Autenticação
  await document.useServiceAccountAuth({
    client_email: process.env.SHEETS_CREDENTIALS_CLIENT_EMAIL,
    private_key: process.env.SHEETS_CREDENTIALS_PRIVATE_KEY,
  });

  await document.loadInfo();

  const world = await WorldSheet(document);
  const country = await CountrySheet(document);
  const state = await StateSheet(document);

  return {
    world,
    country,
    state,
  };
};

module.exports = AccessSpreadsheet;
