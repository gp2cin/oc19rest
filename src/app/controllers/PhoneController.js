const { User } = require('../models/User');
const { Phone } = require('../models/Phone');
const { Individual } = require('../models/Individual');

const PhoneController = {
  list: async (req, res) => {
    const { id } = req.decoded;
    let { page } = req.params;
    if (page == undefined) page = 0;
    try {
      const user = await User.findOne({ _id: id });
      if (user) {
        var perPage = 10;
        const count = await user.individual.phones.count();
        const phone = await Phone.find({
          $and: [
            {
              individual: user.individual
            },
            {
              active: true
            }
          ]
        })
          .select(
            'addressline1 addressline2 throughfare subThroughfare administrativeArea subAdministrativeArea locality subLocality postalCode country isoCode timezone location'
          )
          .limit(perPage)
          .skip(perPage * page);

        res.status(200).send({
          phone,
          count,
          page
        });
      }
    } catch (e) {
      res.status(400).send(e);
    }
  },
  store: async (req, res) => {
    const { id } = req.decoded;
    const {
      addressline1,
      addressline2,
      throughfare,
      subThroughfare,
      administrativeArea,
      subAdministrativeArea,
      locality,
      subLocality,
      postalCode,
      country,
      isoCode,
      timezone,
      location
    } = req.body;
    try {
      const user = await User.findOne({ _id: id });
      if (user) {
        const address = await Phone.create({
          individual: user.individual,
          addressline1,
          addressline2,
          throughfare,
          subThroughfare,
          administrativeArea,
          subAdministrativeArea,
          locality,
          subLocality,
          postalCode,
          country,
          isoCode,
          timezone,
          location,
          active: true
        });
        user.individual.phone.push(address);
        await user.save();
        res.status(201).send(address);
      }
    } catch (e) {
      res.status(402).send(e);
    }
  },
  find: async (req, res) => {
    const user_id = req.decoded.id;
    const { id } = req.params;
    try {
      const address = await User.findOne({
        $and: [{ 'individual.phone._id': id }, { _id: user_id }, { active: true }]
      }).select(
        `individual.phone.addressline1
        individual.phone.addressline2
        individual.phone.throughfare
        individual.phone.subThroughfare
        individual.phone.administrativeArea
        individual.phone.subAdministrativeArea
        individual.phone.locality
        individual.phone.subLocality
        individual.phone.postalCode
        individual.phone.country
        individual.phone.isoCode
        individual.phone.timezone
        individual.phone.location
        individual.phone.active`
      );
      if (!address) res.status(404).send({ message: 'Phone not found.' });
      res.status(200).send(address.individual.phone[0]);
    } catch (e) {
      res.status(402).send(e);
    }
  },
  update: async (req, res) => {
    const { id } = req.params;
    const user_id = req.decoded.id;
    const fields = [
      'addressline1',
      'addressline2',
      'throughfare',
      'subThroughfare',
      'administrativeArea',
      'subAdministrativeArea',
      'locality',
      'subLocality',
      'postalCode',
      'country',
      'isoCode',
      'timezone',
      'location'
    ];
    try {
      const user = await User.findOne({
        $and: [{ _id: user_id }, { active: true }]
      });
      if (!user) res.send(400).send({ message: 'Phone not found.' });
      let returned = null;
      let newAdress = user.individual.phone.map(address => {
        if (address._id == id && address.active) {
          fields.map(field => {
            req.body[field] != undefined && (address[field] = req.body[field]);
          });
          returned = address;
        }
        return address;
      });
      user.individual.address = newAdress;
      await user.save();
      if (returned) res.status(200).send(returned);
      returned.active = undefined;
      return res.status(400).send({ message: 'Phone not found.' });
    } catch (e) {
      res.status(400).send({ error: e });
    }
  },
  remove: async (req, res) => {
    const { id } = req.params;
    const user_id = req.decoded.id;
    try {
      const user = await User.findOne({
        $and: [{ _id: user_id }, { active: true }]
      });
      if (!user) res.send(400).send({ message: 'Phone not found.' });
      let returned = null;
      let newAdress = user.individual.phone.map(address => {
        if (address._id == id && address.active) {
          address.active = false;
          returned = address;
        }
        return address;
      });
      user.individual.address = newAdress;
      await user.save();
      if (returned) res.status(200).send(returned);
      returned.active = undefined;
      return res.status(400).send({ message: 'Phone not found.' });
    } catch (e) {
      console.log(e);
      res.status(400).send({ error: e });
    }
  }
};

module.exports = PhoneController;
