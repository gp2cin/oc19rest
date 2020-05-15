const { Neighborhood } = require('../models/Neighborhood');
const { City } = require('../models/City');
const formatName = require('../../utils/formatName')

const NeighborController = {
    list: async (req, res) => {
        try {
            const { cidade } = req.query;
            const city = await City.findOne({ name_ca: formatName(cidade) });

            if (city) {
                const neighborhoods = await Neighborhood.find({ city: city._id });
                if (neighborhoods.length > 0) { res.status(200).send(neighborhoods) }
                else { res.status(404).json({ 'message': 'Neighborhood not found' }) }
            } else {
                res.status(404).json({ 'message': 'City not found' });
            }
        } catch (e) {
            console.log(e)
            res.status(400).send()
        }
    }
}

module.exports = NeighborController