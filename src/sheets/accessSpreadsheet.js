const { GoogleSpreadsheet } = require('google-spreadsheet');
const credencials = require('./credentials.json');
const { SHEETS_URL, SHEETS_CREDENTIALS_CLIENT_EMAIL, SHEETS_CREDENTIALS_PRIVATE_KEY } = process.env;
const AccessSpreadsheet = async function () {
  //peganda a planilha usando a chave na URL
  const document = new GoogleSpreadsheet(SHEETS_URL);

  //Autenticação
  await document.useServiceAccountAuth({
    client_email: SHEETS_CREDENTIALS_CLIENT_EMAIL,
    private_key: SHEETS_CREDENTIALS_PRIVATE_KEY,
  });

  await document.loadInfo();
  return document;
};

module.exports = AccessSpreadsheet;
