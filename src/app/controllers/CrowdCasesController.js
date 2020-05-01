const { CityCrowdCases } = require('../models/CityCrowdCases')
const { Neighborhood } = require('../models/Neighborhood')

const CrowdCasesController = {
    list: async (req, res) => {
        try {
            const cities = await CityCrowdCases.find()
            const neighborhood = await Neighborhood.find()

            res.status(200).send({
                cities,
                neighborhood
            });
        } catch (e) {
            res.status(400).send();
            console.log(e);
        }
    },
    find: async (req, res) => {
        const { cidade } = req.query;

        try {
            if (!cidade) {
                const state = await State.findOne({ name: 'pernambuco' });
                res.status(200).send(state);
            } else {
                const city = await CityOfficialCases.findOne({ name: cidade.toLowerCase() })

                if (city) res.status(200).send(city)
                else res.status(404).send({ message: `city '${cidade.toLowerCase()}' not found` });
            }
        } catch (e) {
            console.log(e)
            res.status(400).send({ message: 'Bad Request' })
        }
    },
}

module.exports = CrowdCasesController