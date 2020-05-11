const file = require('./cidades.json');
const { features } = file
const moment = require('moment');
const { City } = require('../../app/models/City');
const { State } = require('../../app/models/State');

const formatName = require('../utils/formatName');
const sortArrayByName = require('../utils/sortArrayByName');

module.exports = async () => {
    let city_record = await City.findOne()
    try {
        if (!city_record) {
            let sorted_array = sortArrayByName(features)

            let array_cities = [];
            const { _id } = await State.findOne({ name: 'pernambuco' })
            for (let f in sorted_array) {
                const { geometry, properties } = sorted_array[f]
                array_cities.push({
                    name_ca: formatName(properties.name_ca),
                    name: properties.name,
                    state: _id,
                    geometry: geometry
                });
            };

            for (let c in array_cities) {
                const record = await City.create(array_cities[c]);
                record.save()
            }

            console.log(`Cities created at ${moment().format('DD/MM/YYYY')}`);
            //console.log(array_cities[0])
        } else {
            console.log('ok')
        }
    } catch (error) {
        console.log(error)
    }
}