const { GeneralObservation } = require('../models/GeneralObservation');
const { User } = require('../models/User');
const { Neighborhood } = require('../models/Neighborhood');

const GeneralObservationController = {
    store: async (req, res) => {
        try {
            let {
                observer_name,
                observer_email,
                neighborhood,
                neighborhood_name,
                report_type,
                observation,
            } = req.body;

            let neighborhoodId = undefined;
            if (neighborhood) {
                const searchNeighborhood = await Neighborhood.findOne({ _id: neighborhood });
                if (searchNeighborhood) {
                    neighborhoodId = searchNeighborhood._id;
                } else {
                    console.log('Neighborhood not found');
                }
            }

            if (observer_name === "" && observer_email === "") {
                console.log('OI');
                if (req.decoded !== null && req.decoded !== undefined) {
                    console.log('OI2');
                    const searchUser = await User.findOne({ _id: req.decoded.id });
                    if (!searchUser) {
                        console.log('OI3');
                        res.status(404).send({ message: 'User not found. Logout and Login again.' })
                    } else {
                        console.log('OI4');
                        observer_name = searchUser.name;
                        observer_email = searchUser.email;
                        const generalObservation = GeneralObservation.create({
                            observer_name: observer_name,
                            observer_email: observer_email,
                            neighborhood: neighborhoodId,
                            neighborhood_name: neighborhood_name,
                            report_type: report_type,
                            observation: observation,
                        })

                        console.log(generalObservation);

                        GeneralObservation.collection.insertOne(generalObservation, (err, docs) => {
                            if (err) {
                                console.log(err);
                                res.status(400).send(err);
                            } else {
                                res.status(201).send({
                                    message: 'Created successfully',
                                    generalObservation,
                                });
                            }
                        })
                    }
                } else {
                    res.status(404).send({ message: 'User not found. Logout and Login again.' })
                }
            } else {
                const generalObservation = GeneralObservation.create({
                    observer_name: observer_name,
                    observer_email: observer_email,
                    neighborhood: neighborhoodId,
                    neighborhood_name: neighborhood_name,
                    report_type: report_type,
                    observation: observation,
                })

                console.log(generalObservation);

                GeneralObservation.collection.insertOne(generalObservation, (err, docs) => {
                    if (err) {
                        console.log(err);
                        res.status(400).send(err);
                    } else {
                        res.status(201).send({
                            message: 'Created successfully',
                            generalObservation,
                        });
                    }
                })
            }

        } catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    },
    list: async (req, res) => {
        try {
            lmt = 20;
            ofst = 0; // tamanho da página
            pg = 1;
            const { page, limit, offset } = req.query;
            if (limit) {
                lmt = limit;
            }
            if (offset) {
                ofst = offset;
            }
            if (page) {
                ofst = (parseInt(page) - 1) * limit;
            }

            const count = await GeneralObservation.count({
                active: true,
            });

            const generalObservations = await GeneralObservation.find({
                active: true,
            })
                .limit(lmt)
                .skip(offset);
            if (generalObservations)
                res.status(200).send({
                    generalObservations,
                    pagination: {
                        count,
                        pages: Math.ceil(count / lmt),
                        page: parseInt(page),
                    },
                });
        } catch (e) {
            res.status(400).send(e);
        }
    }
}

module.exports = GeneralObservationController;