const UpdateSheet = require('./updateSheet');
const MortalitySheet = require('./mortalitySheet');

const StateSheet = async function (doc) {
    const state_sheet = doc.sheetsByIndex[7]; //Pega a tabela de casos por municipios de Pernambuco
    const state_rows = await state_sheet.getRows();
    const total_row = state_rows[state_rows.length - 1]; //Pega o total dos dados
    const update = await UpdateSheet(doc, 'B3')

    const country_sheet = doc.sheetsByIndex[6];
    await country_sheet.loadCells('D18');
    const country_cell = country_sheet.getCellByA1('D18').value

    //Pega os dados dos municipios
    let cities = [];

    state_rows.forEach((row) => {
        if (!(row._rawData[0] === '' || row._rawData[0] === 'Total' || row._rawData[0] === 'Outro Pais' || row._rawData[0] === 'Outro Estado')) {
            cities.push({
                name: row._rawData[0].toLowerCase(),
                suspects: Number(row._rawData[1].replace(/[^0-9]/g, '')),
                confirmed: Number(row._rawData[2].replace(/[^0-9]/g, '')),
                recovered: Number(row._rawData[3].replace(/[^0-9]/g, '')),
                deaths: Number(row._rawData[4].replace(/[^0-9]/g, '')),
                active: Number(row._rawData[5].replace(/[^0-9]/g, '')),
                state: 'pernambuco',
                updated_at: update
            });
        }
    });

    const data = {
        name: 'pernambuco',
        cities: cities,
        suspects: Number(total_row._rawData[1].replace(/[^0-9]/g, '')),
        confirmed: Number(total_row._rawData[2].replace(/[^0-9]/g, '')),
        recovered: Number(total_row._rawData[3].replace(/[^0-9]/g, '')),
        deaths: Number(total_row._rawData[4].replace(/[^0-9]/g, '')),
        active: Number(total_row._rawData[5].replace(/[^0-9]/g, '')),
        lethality_percentage: Number(country_cell.toPrecision(3).replace(/%/g, '')),
        mortality_100k: await MortalitySheet(doc, 'B1'),
        updated_at: update,
    };

    return data;
};

module.exports = StateSheet;