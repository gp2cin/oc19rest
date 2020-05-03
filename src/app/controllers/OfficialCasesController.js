const { World } = require('../models/World');
const { State } = require('../models/State');
const { Country } = require('../models/Country');
const { CityOfficialCases } = require('../models/CityOfficialCases');

const OfficialCasesController = {
    list: async (req, res) => {
        const { estado, cidade } = req.query
        try {
            const world = await World.findOne().sort({ updatedAt: -1 });
            const country = await Country.findOne({ name: 'brazil' });
            const state = await State.findOne({ name: estado.toLowerCase() });
            const city = await CityOfficialCases.findOne({ name: cidade.toLowerCase() })

            res.status(200).send({
                world,
                country,
                state,
                city
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

module.exports = OfficialCasesController