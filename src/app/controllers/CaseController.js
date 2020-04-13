//const AccessSpreadsheet = require('../../services/sheets/accessSpreadsheet');
const { World } = require('../models/WorldCases');
const { State } = require('../models/StatesCases');
const { City } = require('../models/CitiesCases');
const { Country } = require('../models/CountryCases');

const CaseController = {
    find: async (req, res) => {
        //const doc = await AccessSpreadsheet();
        const { estado, cidade } = req.query;

        try {
            if (!estado && !cidade) {
                const world = await World.find()
                const country = await Country.find()
                res.status(200).send({
                    world,
                    country
                });
            }

            if (estado && !cidade) {
                const state = await State.findOne({ name: estado.toLowerCase() });
                if (state !== null) res.status(200).send(state);
                else res.status(404).send({ message: `state ${estado.toLowerCase()} not found` });
            }

            if (estado && cidade) {
                const state = await State.findOne({ name: estado.toLowerCase() });
                if (state) {
                    const city = await City.findOne({ name: cidade.toLowerCase(), uf: state._id });
                    if (city) res.status(200).send(city)
                    else res.status(400).send({ message: `city ${cidade.toLowerCase()}, ${estado.toLowerCase()} not found` })
                } else {
                    res.status(404).send({ message: `state ${estado.toLowerCase()} not found` })
                }
            }

            if (!estado && cidade) res.status(400).send({ message: 'state is required' });
        } catch (e) {
            console.log(e)
            res.status(400).send({ message: 'Bad Request' })
        }
    },
}

module.exports = CaseController