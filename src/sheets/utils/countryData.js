const UpdateDate = require('./updateDate');

const CountryData = async function (doc) {
  const country_sheet = doc.sheetsByIndex[5]; //Pega a tabela de casos por municipios de Pernambuco
  const rows = await country_sheet.getRows();
  const last = rows[rows.length - 1];
  const lethality = last._rawData[3].replace(/,/g, '.');

  const world_sheet = doc.sheetsByIndex[4];
  await world_sheet.loadCells('D28:E28');
  const new_cases = world_sheet.getCellByA1('D28').formattedValue;
  const new_deaths = world_sheet.getCellByA1('E28').formattedValue;

  const data = {
    confirmed: Number(last._rawData[1].replace(/[^0-9]/g, '')),
    deaths: Number(last._rawData[2].replace(/[^0-9]/g, '')),
    newCases: Number(new_cases.replace(/[^0-9]/g, '')),
    newDeaths: Number(new_deaths.replace(/[^0-9]/g, '')),
    lethality_percentage: Number(lethality.replace(/%/g, '')),
    updatedAt: await UpdateDate(doc, 'B2'),
  };

  return data;
};

module.exports = CountryData;
