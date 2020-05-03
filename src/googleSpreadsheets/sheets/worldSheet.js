const UpdateSheet = require('./updateSheet');
const MortalitySheet = require('./mortalitySheet');

const WorldSheet = async function (doc) {
  const sheet = doc.sheetsByIndex[5]; //Pega a tabela de casos por municipios de Pernambuco
  const rows = await sheet.getRows();
  const last = rows[rows.length - 1]; //Pega a ultima linha da planilha, onde esta o total de casos

  const data = {
    confirmed: Number(last._rawData[1].replace(/[^0-9]/g, '')),
    deaths: Number(last._rawData[2].replace(/[^0-9]/g, '')),
    new_cases: Number(last._rawData[3].replace(/[^0-9]/g, '')),
    new_deaths: Number(last._rawData[4].replace(/[^0-9]/g, '')),
    mortality_100k: await MortalitySheet(doc, 'B3'),
    updatedAt: await UpdateSheet(doc, 'B1'),
  };

  return data;
};

module.exports = WorldSheet;
