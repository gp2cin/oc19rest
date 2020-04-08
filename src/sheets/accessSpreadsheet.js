const { GoogleSpreadsheet } = require('google-spreadsheet');
const credencials = require('./credentials.json');

const AccessSpreadsheet = async function () {
    //peganda a planilha usando a chave na URL
    const document = new GoogleSpreadsheet('12X2R6JxNU0pezXL-G_492V-KWIYldeOZfqZllfln4vk')

    //Autenticação
    await document.useServiceAccountAuth({
        client_email: credencials.client_email,
        private_key: credencials.private_key,
    });

    await document.loadInfo();
    return document
};

module.exports = AccessSpreadsheet









