const dotenv = require('dotenv');
dotenv.config();
const { IRRD_SHEETS_URL, SHEETS_CREDENTIALS_CLIENT_EMAIL, SHEETS_CREDENTIALS_PRIVATE_KEY } = process.env;

const { GoogleSpreadsheet } = require('google-spreadsheet');

const StateSheet = require('./stateSheet');
const WorldSheet = require('./worldSheet');
const CountrySheet = require('./countrySheet');

const AccessSpreadsheet = async function () {
  //peganda a planilha usando a chave na URL
  const document = new GoogleSpreadsheet(IRRD_SHEETS_URL);

  //Autenticação
  await document.useServiceAccountAuth({
    client_email: SHEETS_CREDENTIALS_CLIENT_EMAIL,
    private_key: SHEETS_CREDENTIALS_PRIVATE_KEY,
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
