const dotenv = require('dotenv')
dotenv.config()
const { SHEETS_URL, SHEETS_CREDENTIALS_CLIENT_EMAIL, SHEETS_CREDENTIALS_PRIVATE_KEY } = process.env

const { GoogleSpreadsheet } = require('google-spreadsheet');
const StateData = require('./stateData');
const WorldData = require('./worldData');
const CountryData = require('./countryData')

async function AccessSpreadsheet() {
    //peganda a planilha usando a chave na URL
    const document = new GoogleSpreadsheet(SHEETS_URL)

    //Autenticação
    await document.useServiceAccountAuth({
        client_email: SHEETS_CREDENTIALS_CLIENT_EMAIL,
        private_key: SHEETS_CREDENTIALS_PRIVATE_KEY,
    });

    await document.loadInfo();

    const world = await WorldData(document)
    const country = await CountryData(document)
    const state = await StateData(document)

    return {
        world,
        country,
        state,
    }
};

module.exports = AccessSpreadsheet










