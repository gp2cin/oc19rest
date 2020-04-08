const AccessSpreadsheet = require('./accessSpreadsheet')

//Pega os casos por municipio
function CityCases(rows) {
    let citys = []
    rows.forEach(row => {
        if (!(row.Município === '' || row.Município === 'Total')) {
            citys[row.Município] = {
                'suspeitos': row.Suspeito,
                'confirmados': row.Confirmado,
                'descartados': row.Descartado,
                'obitos': row.Obito,
                'total': row.Total,
            };
        }
    });
    return citys
}

//Pega o valor de uma célula na planilha
async function getCellValue(sheets, sheetIndex, cellIndex) {
    const sheet = sheets.sheetsByIndex[sheetIndex]
    await sheet.loadCells()
    const cell = sheet.getCellByA1(cellIndex)

    return cell.value
}

//Pega os dados da tabela
const StateData = async function () {
    const doc = await AccessSpreadsheet()

    const updateSheet = doc.sheetsByIndex[0]
    await updateSheet.loadCells('A1:C3')
    const cell = updateSheet.getCellByA1('B3')
    const updated = cell._rawData.formattedValue //Pegar a data formatada em DD/MM/AAAA

    const stateSheet = doc.sheetsByIndex[6]; //Pega a tabela de casos por municipios de Pernambuco
    const rows = await stateSheet.getRows()
    const last = rows[rows.length - 1] //Pega a ultima linha da planilha, onde esta o total de casos
    const city_cases = CityCases(rows)

    //Pega o total de casos
    const total_cases = {
        'suspeitos': last.Suspeito,
        'confirmados': last.Confirmado,
        'descartados': last.Descartado,
        'obitos': last.Obito,
        'total': last.Total,
    }

    const mortality = await getCellValue(doc, 1, 'B1') //Mortalidade a cada 100 mil habitantes
    const lethality = await getCellValue(doc, 2, 'B1') //Porcentagem da Letalidade
    const discarded = await getCellValue(doc, 3, 'B1') //Porcentagem de casos descartados

    return {
        city_cases,
        total_cases,
        mortality,
        lethality,
        discarded,
        updated,
    }
}

module.exports = StateData