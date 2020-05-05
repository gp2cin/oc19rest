const { World } = require('../models/World');
const { State } = require('../models/State');
const { Country } = require('../models/Country');
const { Cities } = require('../models/Cities');

const OfficialCasesController = {
    list: async (req, res) => {
        const { estado, cidade } = req.query
        try {
            const world = await World.findOne().sort({ updatedAt: -1 });
            const country = await Country.findOne({ name: 'brazil' });
            const state = await State.findOne({ name: estado.toLowerCase() });
            const city = await Cities.findOne({ name: cidade.toLowerCase() })

            res.status(200).send({
                world: {
                    confirmed: world.confirmed
                },
                country: {
                    name: country.name,
                    confirmed: country.confirmed
                },
                state: {
                    name: state.name,
                    confirmed: state.confirmed
                },
                city: {
                    name: city.name,
                    confirmed: city.official_cases.confirmed
                }
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
                const { name, suspects, confirmed, recovered, deaths, active, lethality_percentage, mortality_100k, updatedAt } = await State.findOne({ name: 'pernambuco' });
                res.status(200).send({ name, suspects, confirmed, recovered, deaths, active, lethality_percentage, mortality_100k, updatedAt });
            } else {
                const city = await Cities.findOne({ name: cidade.toLowerCase() })

                if (city) {
                    const { name, official_cases, updatedAt } = city;
                    const { suspects, confirmed, recovered, deaths, active } = official_cases;
                    res.status(200).send({ name, suspects, confirmed, recovered, deaths, active, updatedAt });
                } else {
                    res.status(404).send({ message: `city '${cidade.toLowerCase()}' not found` });
                }
            }
        } catch (e) {
            console.log(e)
            res.status(400).send({ message: 'Bad Request' })
        }
    },
}

module.exports = OfficialCasesController