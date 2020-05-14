const { World } = require('../models/World');
const { State } = require('../models/State');
const { Country } = require('../models/Country');
const { City } = require('../models/City');
const { CityOfficialCases } = require('../models/CityOfficialCases');
const { Neighborhood } = require('../models/Neighborhood');
const { ObserverReport } = require('../models/ObserverReport');

const formatName = require('../../utils/formatName')

const CasesController = {
    map: async (req, res) => {
        const { mapa } = req.query
        let geojson = {}
        try {
            if (mapa.toLowerCase() === 'cidade') {
                const cities = await City.find()

                const cities_geojson = {
                    type: "FeatureCollection",
                    features: []
                }

                for (let c in cities) {
                    let official_cases = await CityOfficialCases.findOne({ city: cities[c]._id })
                    const state = await State.findOne({ _id: cities[c].state })
                    const observer_reports = await ObserverReport.find({ city: cities[c].name_ca })

                    if (official_cases) {
                        official_cases = {
                            'confirmed': official_cases.confirmed,
                            'recovered': official_cases.recovered,
                            'deaths': official_cases.deaths,
                            'active': official_cases.active,
                            'updatedAt': official_cases.updatedAt
                        }
                    } else {
                        official_cases = {
                            'confirmed': 0,
                            'recovered': 0,
                            'deaths': 0,
                            'active': 0,
                            'updatedAt': state.updatedAt
                        }
                    }
                    cities_geojson.features.push({
                        type: "Feature",
                        properties: {
                            id: cities[c]._id,
                            name_ca: cities[c].name_ca,
                            name: cities[c].name,
                            state: state.name,
                            official_cases: official_cases,
                            observer_reports: observer_reports
                        },
                        geometry: cities[c].location
                    });
                }
                geojson = cities_geojson
            } else if (mapa.toLowerCase() === 'bairro') {
                const neighborhoods = await Neighborhood.find()

                const neighbor_geojson = {
                    type: "FeatureCollection",
                    features: []
                }

                for (let n in neighborhoods) {
                    const city = await City.findOne({ _id: neighborhoods[n].city })
                    const observer_reports = await ObserverReport.find({ neighborhood: neighborhoods[n]._id })
                    neighbor_geojson.features.push({
                        type: "Feature",
                        properties: {
                            id: neighborhoods[n]._id,
                            name_ca: neighborhoods[n].name_ca,
                            name: neighborhoods[n].name,
                            city: city.name,
                            observer_reports: observer_reports
                        },
                        geometry: neighborhoods[n].location
                    });

                }
                geojson = neighbor_geojson
            } else {
                res.status(400).send();
            }
            res.status(200).json(geojson);
        } catch (e) {
            res.status(400).send();
            console.log(e)
        }
    },
    confirmed: async (req, res) => {
        const { estado, cidade } = req.query
        try {
            const world = await World.findOne().sort({ updatedAt: -1 });
            const country = await Country.findOne({ name: 'brazil' });
            const state = await State.findOne({ name: estado.toLowerCase() });
            const city = await City.findOne({ name_ca: formatName(cidade) })

            const data = {
                world: {},
                country: {},
                state: {},
                city: {}
            }

            if (world) {
                data.world = {
                    confirmed: world.confirmed,
                    updatedAt: world.updatedAt
                }
            }
            if (country) {
                data.country = {
                    name: country.name,
                    confirmed: country.confirmed
                }
            }
            if (state) {
                data.state = {
                    name: state.name,
                    confirmed: state.confirmed
                }
            }
            if (city) {
                const official_cases = await CityOfficialCases.findOne({ city: city._id })
                data.city = {
                    name: city.name_ca,
                    confirmed: official_cases.confirmed
                }
            }
            res.status(200).send(data);
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
                const city = await City.findOne({ name_ca: formatName(cidade) })

                if (city) {
                    const { confirmed, recovered, deaths, active, updatedAt } = await CityOfficialCases.findOne({ city: city._id });
                    res.status(200).send({ name: city.name, confirmed, recovered, deaths, active, updatedAt });
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

module.exports = CasesController