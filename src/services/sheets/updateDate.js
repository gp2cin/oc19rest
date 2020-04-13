
function formatDate(param) {
    const a = param.replace('.', '')
    return b
}

const UpdateDate = async function (doc, cellIndex) {
    const sheet = doc.sheetsByIndex[0]
    const rows = sheet.getRows()
    //const sheet = doc.sheetsByIndex[0];
    //await sheet.loadCells('A1:C3');

    //const cell = formatDate(sheet.getCellByA1(cellIndex)._rawData.formattedValue)
    //Pegar a data formatada em DD/MM/AAAA
    /*
    const world = new Date(sheet.getCellByA1('B1')._rawData.formattedValue.replace('.', ''))
    const country = new Date(sheet.getCellByA1('B2')._rawData.formattedValue.replace('.', ''))
    const state = new Date(sheet.getCellByA1('B3')._rawData.formattedValue.replace('.', ''))
    */

    return new Date('12-apr-2020')
}

module.exports = UpdateDate