const file = require('./bairros.json');
const { features } = file;
const moment = require('moment');
const { Neighborhood } = require('../../app/models/Neighborhood');
//const { City } = require('../../app/models/City');
const formatName = require('../utils/formatName');
const sortArrayByName = require('../utils/sortArrayByName');

module.exports = async () => {
    try {
        //const neighbor_record = await Neighborhood.findOne();
        let sorted_array = sortArrayByName(features)
        let array_bairros = [];

        //const { _id } = await City.findOne({ name_ca: 'recife' });
        for (let f in sorted_array) {
            const { type, geometry, properties } = sorted_array[f]
            array_bairros.push({
                type: type,
                properties: {
                    name_ca: formatName(properties.name_ca),
                    name: properties.name,
                },
                geometry: geometry
            });
        };
        //await Neighborhood.insertMany(array_bairros)
        //console.log(`Recife neighborhoods created at ${moment().format('DD/MM/YYYY')}`);
        console.log(array_bairros)
    } catch (error) {
        console.log(error)
    }
}