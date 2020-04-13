const credencials = require('./credentials.json');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const StateData = require('./stateData');
const WorldData = require('./worldData');
const CountryData = require('./countryData')

async function AccessSpreadsheet() {
    //peganda a planilha usando a chave na URL
    sheets_id = process.env.SHEETS_ID || credencials.sheets_id
    const document = new GoogleSpreadsheet(sheets_id)

    const email = process.env.CLIENT_EMAIL || credencials.client_email
    const key = process.env.PRIVATE_KEY || credencials.private_key
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










