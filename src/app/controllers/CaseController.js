const { World } = require('../models/WorldCases');
const { State } = require('../models/StateCases');
const { Country } = require('../models/CountryCases');

const CaseController = {
    list: async (req, res) => {
        try {
            const world = await World.findOne().sort({ updatedAt: -1 })
            const country = await Country.findOne().sort({ updatedAt: -1 })
            res.status(200).send({
                world,
                country
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
                const { _id, suspects, confirmed, recovered, deaths, active, total, lethality_percentage, updatedAt, __v } = await State.findOne().sort({ updatedAt: -1 });
                res.status(200).send({
                    _id,
                    suspects,
                    confirmed,
                    recovered,
                    deaths,
                    active,
                    total,
                    lethality_percentage,
                    updatedAt,
                    __v
                });
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