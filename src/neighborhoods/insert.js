const file = require('./bairros.json');
const { features } = file
const moment = require('moment')
const { Neighborhood } = require('../app/models/Neighborhood')
const { Cities } = require('../app/models/Cities')

const insert = async () => {
    try {
        let array_bairros = [];
        let update = new Date();
        let byName = features.slice(0);
        byName.sort((a, b) => {
            let x = a.properties.bairro_nome_ca.toLowerCase();
            let y = b.properties.bairro_nome_ca.toLowerCase();
            return x < y ? -1 : x > y ? 1 : 0
        });

        const { _id } = await Cities.findOne({ name: 'recife' });
        for (let f in byName) {
            const { geometry, properties } = byName[f]
            array_bairros.push({
                name_ca: properties.bairro_nome_ca.toLowerCase(),
                name: properties.bairro_nome,
                suspects: 0,
                confirmed: 0,
                deaths: 0,
                city: _id,
                updatedAt: update,
                location: geometry
            });
        };
        const neighbor_record = await Neighborhood.findOne();
        if (!neighbor_record) {
            await Neighborhood.insertMany(array_bairros)
            console.log(`Recife neighborhoods created at ${moment(update).format('DD/MM/YYYY')}`);
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = insert