const { World } = require('../models/World');
const { State } = require('../models/State');
const { Country } = require('../models/Country');
const { CityOfficialCases } = require('../models/CityOfficialCases');

const OfficialCasesController = {
    list: async (req, res) => {
        try {
            const world = await World.findOne().sort({ updated_at: -1 });
            const country = await Country.findOne({ name: 'brazil' });
            const state = await State.findOne({ name: 'pernambuco' });
            const cities = await CityOfficialCases.find({ state: state._id })

            res.status(200).send({
                world,
                country,
                state,
                cities
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