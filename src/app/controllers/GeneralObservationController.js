const { GeneralObservation } = require('../models/GeneralObservation');

const GeneralObservationController = {
    store: async (req, res) => {
        try {
            const {
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

            const generalObservation = GeneralObservation.create({
                observer_name: observer_name,
                observer_email: observer_email,
                neighborhood: neighborhoodId,
                neighborhood_name: neighborhood_name,
                report_type: report_type,
                observation: observation,
            })

            GeneralObservation.collection.insertOne(generalObservation, (err, docs) => {
                if (err) {
                    console.log(err);
                    res.status(400).send(err);
                } else {
                    res.status(201).send({
                        message: 'Created successfully',
                        observerReport,
                    });
                }
            })

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