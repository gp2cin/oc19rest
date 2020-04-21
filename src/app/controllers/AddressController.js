const { User } = require('../models/User');
const { Address } = require('../models/Address');
const { Individual } = require('../models/Individual');

const AddressController = {
  list: async (req, res) => {
    const user_id = req.decoded.id;
    const { id } = req.params;
    try {
      let returned = null;
      const user = await User.findOne({
        $and: [{ 'individual.addresses.active': true }, { _id: user_id }, { active: true }]
      }).select(
        `individual.addresses._id
        individual.addresses.addressline1
        individual.addresses.addressline2
        individual.addresses.throughfare
        individual.addresses.subThroughfare
        individual.addresses.administrativeArea
        individual.addresses.subAdministrativeArea
        individual.addresses.locality
        individual.addresses.subLocality
        individual.addresses.postalCode
        individual.addresses.country
        individual.addresses.isoCode
        individual.addresses.timezone
        individual.addresses.location
        individual.addresses.active`
      );
      if (!user) res.status(400);
      returned = user.individual.addresses.filter(address => address.active);
      res.status(200).send(returned);
    } catch (e) {
      console.log(e);
      res.status(402).send({ error: e });
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
        const address = await Address.create({
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
        user.individual.addresses.push(address);
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
      const user = await User.findOne({
        $and: [{ 'individual.addresses._id': id }, { _id: user_id }, { 'individual.addresses.active': true }]
      }).select(
        `individual.addresses.addressline1
        individual.addresses.addressline2
        individual.addresses.throughfare
        individual.addresses.subThroughfare
        individual.addresses.administrativeArea
        individual.addresses.subAdministrativeArea
        individual.addresses.locality
        individual.addresses.subLocality
        individual.addresses.postalCode
        individual.addresses.country
        individual.addresses.isoCode
        individual.addresses.timezone
        individual.addresses.location
        individual.addresses.active`
      );
      if (!user) res.status(404).send({ message: 'Address not found.' });

      console.log(user);
      // res.status(200).send(user ? user.individual.addresses[0] : {});
    } catch (e) {
      console.log(e);
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
      if (!user) res.send(400).send({ message: 'Address not found.' });
      let returned = null;
      let newAdress = user.individual.addresses.map(address => {
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
      return res.status(400).send({ message: 'Address not found.' });
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
      if (!user) res.send(400).send({ message: 'Address not found.' });
      let success = false;
      let newAdress = user.individual.addresses.map(address => {
        console.log(address._id);
        if (address._id == id && address.active) {
          address.active = false;
          success = true;
        }
        return address;
      });
      user.individual.address = newAdress;
      await user.save();
      if (success) res.status(204);
      return res.status(400).send({ message: 'Address not found.' });
    } catch (e) {
      console.log(e);
      res.status(400).send({ error: e });
    }
  }
};

module.exports = AddressController;
