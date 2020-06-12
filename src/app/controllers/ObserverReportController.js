const moment = require('moment');
const formatName = require('../../utils/formatName')

const { ObserverReport } = require('../models/ObserverReport')
const { User } = require('../models/User');
const { Individual } = require('../models/Individual');
const { Diseases } = require('../models/Diseases');
const { Neighborhood } = require('../models/Neighborhood');
const { City } = require('../models/City');


const ObserverReportController = {
    store: async (req, res) => {
        try {
            const {
                city,
                city_ca,
                neighborhood,
                neighborhood_name,
                report_type,
                case_type,
                death_date,
                case_name,
                case_age,
                case_gender,
                diseases,
                household_contact_confirmed_case,
                info_source,
                info_source_link,
                general_comments,
                number_of_cases,
            } = req.body;

            const searchUser = await User.findOne({ _id: req.decoded.id });
            let userId = undefined;
            if (!searchUser) {
                res.status(404).send({ message: 'User not found. Logout and Login again.' })
            } else {
                userId = searchUser._id;
            }

            //Searching neighborhood
            let neighborhoodId = undefined;
            if (neighborhood) {
                const searchNeighborhood = await Neighborhood.findOne({ _id: neighborhood });
                if (searchNeighborhood) {
                    neighborhoodId = searchNeighborhood._id;
                } else {
                    console.log('Neighborhood not found');
                }
            }

            let cityId = undefined;
            if (city_ca) {
                const searchCity = await City.findOne({ name_ca: city_ca });
                if (searchCity) {
                    cityId = searchCity._id;
                } else {
                    console.log('City not found');
                }
            }

            //if (Number(case_age) == NaN) res.status(400).send({ message: 'Age is not a number.' });
            console.log(Number(number_of_cases));
            if (Number(number_of_cases) !== 0 && (number_of_cases !== null && number_of_cases !== undefined) && Number(number_of_cases) !== NaN) {
                let reportArray = [];
                for (i = 0; i < Number(number_of_cases); i++) {
                    const case_individual = await Individual.create({});
                    const observerReport = ObserverReport.create({
                        whistleblower: userId,
                        city: city,
                        city_mongo_id: cityId,
                        neighborhood: neighborhoodId,
                        neighborhood_name: neighborhood_name,
                        report_type: report_type,
                        case_type: case_type,
                        case_individual: case_individual,
                        info_source: info_source,
                        info_source_link: info_source_link,
                        general_comments: general_comments,
                    });
                    reportArray = [...reportArray, observerReport];
                }
                ObserverReport.collection.insertMany(reportArray, function (err, resp) {
                    if (err) {
                        console.log(err);
                        res.status(400).send(err);
                    } else {
                        const len = resp.length;
                        res.status(201).send({
                            message: 'Created successfully',
                            resp,
                        });
                    }
                });
            } else {
                const diseass = await Diseases.create(diseases);
                let case_individual = undefined;
                if (death_date !== '') {
                    case_individual = await Individual.create({
                        name: case_name,
                        gender: case_gender ? (['MALE', 'FEMALE'].includes(case_gender.toUpperCase()) ? case_gender.toUpperCase() : 'OTHER') : 'OTHER',
                        age: case_age,
                        diseases: diseass,
                        death_date: moment(death_date),
                    });
                } else {
                    case_individual = await Individual.create({
                        name: case_name,
                        gender: case_gender ? (['MALE', 'FEMALE'].includes(case_gender.toUpperCase()) ? case_gender.toUpperCase() : 'OTHER') : 'OTHER',
                        age: case_age,
                        diseases: diseass,
                    });
                }
                const observerReport = ObserverReport.create({
                    whistleblower: userId,
                    city: city,
                    city_mongo_id: cityId,
                    neighborhood: neighborhoodId,
                    neighborhood_name: neighborhood_name,
                    report_type: report_type,
                    case_type: case_type,
                    case_individual: case_individual,
                    household_contact_confirmed_case: household_contact_confirmed_case,
                    info_source: info_source,
                    info_source_link: info_source_link,
                    general_comments: general_comments,
                });

                ObserverReport.collection.insertOne(observerReport, (err, docs) => {
                    if (err) {
                        console.log('AQUI');
                        console.log(err);
                        res.status(400).send(err);
                    } else {
                        res.status(201).send({
                            message: 'Created successfully',
                            observerReport,
                        });
                    }
                });
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

            const count = await ObserverReport.count({
                active: true,
            });

            const observerReports = await ObserverReport.find({
                active: true,
            })
                .limit(lmt)
                .skip(offset);
            if (observerReports)
                res.status(200).send({
                    observerReports,
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

module.exports = ObserverReportController;