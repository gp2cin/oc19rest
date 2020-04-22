const { World } = require('../models/WorldCases');
const { State } = require('../models/StateCases');
const { Country } = require('../models/CountryCases');

const CaseController = {
    list: async (req, res) => {
        try {
            const world_cases = await World.findOne().sort({ updatedAt: -1 })
            const country_cases = await Country.findOne().sort({ updatedAt: -1 })
            const state_cases = await State.findOne().sort({ updatedAt: -1 })

            const world = {
                'confirmed': world_cases.confirmed,
                'updatedAt': world_cases.updatedAt
            }
            const country = {
                'confirmed': country_cases.confirmed,
                'updatedAt': country_cases.updatedAt
            }
            const state = {
                'confirmed': state_cases.confirmed,
                'cities': state_cases.cities,
                'updatedAt': state_cases.updatedAt
            }
            res.status(200).send({
                world,
                country,
                state
            });
        } catch (e) {
            res.status(400).send()
            console.log(e)
        }

    },
    find: async (req, res) => {
        const { cidade } = req.query;

        try {
            if (!cidade) {
                const state = await State.findOne().sort({ updatedAt: -1 });
                res.status(200).send(state);
            } else {
                const { cities } = await State.findOne().sort({ updatedAt: -1 });
                const city = cities.find(element => element.name == cidade.toLowerCase())

                if (city) res.status(200).send(city)
                else res.status(404).send({ message: `city '${cidade.toLowerCase()}' not found` });
            }
        } catch (e) {
            console.log(e)
            res.status(400).send({ message: 'Bad Request' })
        }
    },
}

module.exports = CaseController