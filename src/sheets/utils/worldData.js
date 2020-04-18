const UpdateDate = require('./updateDate');

const WorldData = async function (doc) {
  const sheet = doc.sheetsByIndex[4]; //Pega a tabela de casos por municipios de Pernambuco
  const rows = await sheet.getRows();
  const last = rows[rows.length - 1]; //Pega a ultima linha da planilha, onde esta o total de casos

  const data = {
    confirmed: Number(last._rawData[1].replace(/[^0-9]/g, '')),
    deaths: Number(last._rawData[2].replace(/[^0-9]/g, '')),
    newCases: Number(last._rawData[3].replace(/[^0-9]/g, '')),
    newDeaths: Number(last._rawData[4].replace(/[^0-9]/g, '')),
    updatedAt: await UpdateDate(doc, 'B1'),
  };

  return data;
};

module.exports = WorldData;
