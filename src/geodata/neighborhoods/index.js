const file = require('./bairros.json');
const { features } = file;
const moment = require('moment');
const { Neighborhood } = require('../../app/models/Neighborhood');
const { City } = require('../../app/models/City');
const formatName = require('../../utils/formatName');

module.exports = async () => {
    try {
        const neighbor_docs = await Neighborhood.find();

        if (!neighbor_docs == []) {
            for (let f in features) {
                const { _id } = await City.findOne({ name_ca: properties.name_ca });
                const { geometry, properties } = features[f]
                const record = await Neighborhood.create({
                    name_ca: formatName(properties.name_ca),
                    name: properties.name,
                    city: _id,
                    location: geometry
                });
                await record.save()
            };
            console.log(`Recife neighborhoods created at ${moment().format('DD/MM/YYYY')}`);
        }
    } catch (error) {
        console.log(error)
    }
}