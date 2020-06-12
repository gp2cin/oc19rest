const csv = require('csv-parser');
const fs = require('fs');
const { Role } = require('../../app/models/Role');
const { User } = require('../../app/models/User');
const { Individual } = require('../../app/models/Individual');
const { Privilege } = require('../../app/models/Privilege');
const { info } = require('console');

function formatDate(date) {
  let array = date.split(/[^a-z0-9]/gi)
  let day = array[0]
  let month = array[1]
  let year = array[2]
  let hour = array[3]
  let minute = array[4]
  let seconds = array[5]

  return new Date(`${year}-${month}-${day}T${hour}:${minute}:${seconds}.000Z`)
}

const readCSV = async () => {

  fs.createReadStream('data.csv')
    .pipe(csv())
    .on('data', async (row) => {
      const privilege = await Privilege.create({
        name: 'OBSERVER',
      });
      await privilege.save();

      const role = await Role.create({
        name: 'OBSERVER',
        privileges: [privilege],
      });
      await role.save();

      const individual = await Individual.create({
        gender: row['Sexo'][0] === 'F' ? 'FEMALE' : (row['Sexo'][0] == 'M' ? 'MALE' : 'OTHER'),
        createdAt: formatDate(row['Carimbo de data/hora']),
        updatedAt: new Date()
      });
      await individual.save();

      const info = {
        name: row['Nome Completo'],
        email: row.Email.replace(/( ){1,}/g, ''),
        password: Number(row.CPF.slice(0, 5)),
        role: role,
        individual: individual
      }

      const user = await User.create(info);
      await user.save()
    })
    .on('end', () => {
      console.log('CSV file successfully processed');
    });
}

module.exports = readCSV

// let array = readCSV()
// module.exports = array