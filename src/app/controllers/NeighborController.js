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
                const response = []

                if (neighborhoods.length > 0) {
                    neighborhoods.map(item => { response.push(item.name) })
                    res.status(200).send(response);
                } else {
                    res.status(404).json();
                }
            } else {
                res.status(404).json();
            }
        } catch (e) {
            console.log(e)
            res.status(400).send()
        }
    }
}

module.exports = NeighborController