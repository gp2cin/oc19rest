const moment = require('moment');

function formatDate(cell_date) {
  let dictMonths = {
    jan: 01,
    fev: 02,
    mar: 03,
    abr: 04,
    mai: 05,
    jun: 06,
    jul: 07,
    ago: 08,
    set: 09,
    out: 10,
    nov: 11,
    dez: 12,
  };

  try {
    let arrayFromDate = cell_date.replace('.', '').split('-');
    let day = arrayFromDate[0];
    let month = dictMonths[arrayFromDate[1]];
    let year = arrayFromDate[2];
    let date = moment(`${month}-${day}-${year}`, ['MM-DD-YYYY', 'YYYY-MM-DD']).format();

    return date;
  } catch (e) {
    console.log(e);
  }
}

const UpdateDate = async function (doc, cellIndex) {
  try {
    const sheet = doc.sheetsByIndex[0];
    await sheet.loadCells();
    const cell = sheet.getCellByA1(cellIndex);
    const cell_date = cell._rawData.formattedValue;
    const date = formatDate(cell_date);

    return new Date(date);
  } catch (e) {
    console.log(e);
  }
};

module.exports = UpdateDate;
