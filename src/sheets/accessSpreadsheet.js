const dotenv = require('dotenv')
dotenv.config()
const { SHEETS_URL, SHEETS_CREDENTIALS_CLIENT_EMAIL, SHEETS_CREDENTIALS_PRIVATE_KEY } = process.env

const credencials = require('./credentials.json');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const StateData = require('./stateData');
const WorldData = require('./worldData');
const CountryData = require('./countryData')

async function AccessSpreadsheet() {
    //peganda a planilha usando a chave na URL
    sheets_url = SHEETS_URL || credencials.sheets_url
    const document = new GoogleSpreadsheet(sheets_url)

    const email = SHEETS_CREDENTIALS_CLIENT_EMAIL || credencials.client_email
    const key = SHEETS_CREDENTIALS_PRIVATE_KEY || credencials.private_key
    //Autenticação
    await document.useServiceAccountAuth({
        client_email: email,
        private_key: key,
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










