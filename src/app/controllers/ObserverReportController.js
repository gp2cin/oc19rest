const moment = require('moment');

const { ObserverReport } = require('../models/ObserverReport')
const { User } = require('../models/User');
const { Individual } = require('../models/Individual');
const { Diseases } = require('../models/Diseases');

const ObserverReportController = {
    store: async (req, res) => {
        try {
            const {
                observer_name,
                observer_email,
                city,
                neighborhood,
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
            if (!observer_email) res.status(400).send({ message: 'Email is not found.' });
            const searchUser = await User.findOne({ email: observer_email });
            let userId = undefined;
            if (!searchUser) {
                const password = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                const user = await User.create({ password, email: observer_email, active: true });
                const individual = await Individual.create({ name: observer_name });
                user.individual = individual;
                await user.save();
                userId = user._id;
            } else {
                userId = searchUser._id;
            }

            if (Number(number_of_cases) == NaN) res.status(400).send({ message: 'Age is not a number.' });
            if (Number(number_of_cases) != 0) {
                let reportArray = [];
                for (i = 0; i < Number(number_of_cases); i++) {
                    const case_individual = await Individual.create({});
                    const case_individual_id = case_individual._id;
                    reportArray = [...reportArray,
                    {
                        whistleblower: userId,
                        city: city,
                        neighborhood: neighborhood,
                        report_type: report_type,
                        case_type: case_type,
                        case_individual: case_individual_id,
                        info_source: info_source,
                        info_source_link: info_source_link,
                        general_comments: general_comments
                    }
                    ]
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
                const case_individual = await Individual.create({
                    name: case_name,
                    gender: case_gender ? (['MALE', 'FEMALE'].includes(case_gender.toUpperCase()) ? case_gender.toUpperCase() : 'OTHER') : 'OTHER',
                    age: case_age,
                    diseases: diseass
                });
                const case_individual_id = case_individual._id;
                report = {
                    whistleblower: userId,
                    city: city,
                    neighborhood: neighborhood,
                    report_type: report_type,
                    case_type: case_type,
                    case_individual: case_individual_id,
                    death_date: death_date,
                    household_contact_confirmed_case: household_contact_confirmed_case,
                    info_source: info_source,
                    info_source_link: info_source_link,
                    general_comments: general_comments
                }
                ObserverReport.collection.insertOne(report, (err, docs) => {
                    if (err) {
                        console.log(err);
                        res.status(400).send(err);
                    } else {
                        res.status(201).send({
                            message: 'Created successfully',
                            report,
                        });
                    }
                });
            }
        } catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    }
}

module.exports = ObserverReportController;