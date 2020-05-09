const file = require('./cidades.json');
const { features } = file
const moment = require('moment');
//const { City } = require('../../app/models/City');
const { State } = require('../../app/models/State');

const formatName = require('../utils/formatName');
const sortArrayByName = require('../utils/sortArrayByName');

module.exports = async () => {
    try {
        let city_record = 0//await City.findOne()
        if (!city_record) {
            let sorted_array = sortArrayByName(features)

            let array_cities = [];
            const { _id } = await State.findOne({ name: 'pernambuco' })
            for (let f in sorted_array) {
                const { type, geometry, properties } = sorted_array[f]
                array_cities.push({
                    type: type,
                    properties: {
                        name_ca: formatName(properties.name),
                        name: properties.description,
                        state: _id,
                    },
                    geometry: geometry
                });
            };
            //await City.insertMany(array_cities);
            //console.log(`Cities created at ${moment().format('DD/MM/YYYY')}`);
            console.log(array_cities)
        } else {
            console.log('ok')
        }
    } catch (error) {
        console.log(error)
    }
}