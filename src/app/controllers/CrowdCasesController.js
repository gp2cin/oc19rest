const { Cities } = require('../models/Cities')
const { Neighborhood } = require('../models/Neighborhood')

const CrowdCasesController = {
    list: async (req, res) => {
        const { cidade } = req.query;
        try {
            const city = await Cities.findOne({ name: cidade.toLowerCase() });
            const neighborhood = await Neighborhood.find({ city: city._id });
            console.log(neighborhood)
            res.status(200).send({
                city,
                neighborhood
            });
        } catch (e) {
            res.status(400).send();
            console.log(e);
        };
    }
}

module.exports = CrowdCasesController