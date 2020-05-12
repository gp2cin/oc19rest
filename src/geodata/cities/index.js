const file = require('./cidades.json');
const { features } = file
const moment = require('moment');
const { City } = require('../../app/models/City');
const { State } = require('../../app/models/State');
const formatName = require('../../utils/formatName');

module.exports = async () => {
    try {
        const city_docs = await City.find();

        if (city_docs.length == []) {
            //const { _id } = await State.findOne({ name: 'pernambuco' })
            for (let f in features) {
                const { geometry, properties } = features[f];
                const record = await City.create({
                    name_ca: formatName(properties.name_ca),
                    name: properties.name,
                    state: 'pernambuco',
                    location: geometry
                });
                await record.save()
                await City.createIndexes({ location: '2dsphere' })
            };
            console.log(`Cities created at ${moment().format('DD/MM/YYYY')}`);
        }

    } catch (error) {
        console.log(error)
    }
}