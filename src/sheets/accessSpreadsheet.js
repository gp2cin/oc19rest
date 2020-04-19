const dotenv = require('dotenv');
dotenv.config();
const { SHEETS_URL, SHEETS_CREDENTIALS_CLIENT_EMAIL, SHEETS_CREDENTIALS_PRIVATE_KEY } = process.env;

const { GoogleSpreadsheet } = require('google-spreadsheet');

const StateSheet = require('./utils/stateSheet');
const WorldSheet = require('./utils/worldSheet');
const CountrySheet = require('./utils/countrySheet');

const AccessSpreadsheet = async function () {
    //peganda a planilha usando a chave na URL
    const document = new GoogleSpreadsheet(SHEETS_URL);

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
