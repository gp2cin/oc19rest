//Mortlidade a cada 100 mil habitantes
const Mortality = async function (doc, cellIndex) {
    try {
        const sheet = doc.sheetsByIndex[1];
        await sheet.loadCells();
        const cell = sheet.getCellByA1(cellIndex)

        return Number(cell.value.toPrecision(3))
    } catch (e) {
        console.log(e)
    }
}

module.exports = Mortality