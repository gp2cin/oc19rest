const UpdateDate = require('./updateDate');

const StateData = async function (doc) {
    const state_sheet = doc.sheetsByIndex[6]; //Pega a tabela de casos por municipios de Pernambuco
    const state_rows = await state_sheet.getRows();
    const total = state_rows[state_rows.length - 1];//Pega o total dos dados

    const country_sheet = doc.sheetsByIndex[5];
    await country_sheet.loadCells('D18');
    const country_cell = country_sheet.getCellByA1('D18')

    //Pega os dados dos municipios
    let cities = []
    state_rows.forEach(row => {
        if (!(row.Município === '' || row.Município === 'Total')) {
            cities.push({
                'name': row._rawData[0].toLowerCase(),
                'suspects': Number(row._rawData[1].replace(/[^0-9]/g, '')),
                'confirmed': Number(row._rawData[2].replace(/[^0-9]/g, '')),
                'recovered': Number(row._rawData[3].replace(/[^0-9]/g, '')),
                'deaths': Number(row._rawData[4].replace(/[^0-9]/g, '')),
                'active': Number(row._rawData[5].replace(/[^0-9]/g, '')),
                'total': Number(row._rawData[6].replace(/[^0-9]/g, '')),
            })
        }
    });

    const data = {
        'name': state_sheet.title.toLowerCase(),
        'cities': cities,
        'suspects': Number(total._rawData[1].replace(/[^0-9]/g, '')),
        'confirmed': Number(total._rawData[2].replace(/[^0-9]/g, '')),
        'recovered': Number(total._rawData[3].replace(/[^0-9]/g, '')),
        'deaths': Number(total._rawData[4].replace(/[^0-9]/g, '')),
        'active': Number(total._rawData[5].replace(/[^0-9]/g, '')),
        'total': Number(total._rawData[6].replace(/[^0-9]/g, '')),
        'lethality_percentage': Number(country_cell.value.replace(/%/g, '')),
        'updatedAt': await UpdateDate(doc, 'B3')
    }
    return data
}

module.exports = StateData