const dotenv = require('dotenv');
dotenv.config();

const { GoogleSpreadsheet } = require('google-spreadsheet');

const StateSheet = require('./sheets/stateSheet');
const WorldSheet = require('./sheets/worldSheet');
const CountrySheet = require('./sheets/countrySheet');

const AccessSpreadsheet = async function (id) {
  //peganda a planilha usando a chave na URL
  const document = new GoogleSpreadsheet(id);

  //Autenticação
  await document.useServiceAccountAuth({
    client_email: process.env.SHEETS_CREDENTIALS_CLIENT_EMAIL,
    private_key: process.env.SHEETS_CREDENTIALS_PRIVATE_KEY,
  });

  await document.loadInfo();

  if (id == process.env.IRRD_SHEETS_URL) {
    const world = await WorldSheet(document);
    const country = await CountrySheet(document);
    const state = await StateSheet(document);

    return {
      world,
      country,
      state,
    };
  } else if (id === process.env.OCOVID19_SHEETS_URL) {
    return document
  } else {
    console.log('Impossible to get GoogleSpreadsheet')
  }


};

module.exports = AccessSpreadsheet;
