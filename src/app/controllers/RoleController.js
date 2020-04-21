const { Role } = require('../models/Role');
const { User } = require('../models/User');
const { Bess } = require('../models/Bess');

const RoleController = {
  list: async (req, res) => {
    try {
      let { page } = req.params;
      if (page == undefined) page = 0;
      const perPage = 10;
      const count = await Role.find({
        $and: [{ active: true }]
      }).countDocuments();
      const roles = await Role.find({
        active: true
      })
        .select('__id name')
        .limit(perPage)
        .skip(perPage * page);

      res.status(200).send({
        roles,
        count,
        page
      });
    } catch (e) {
      res.status(400).send({ error: e });
    }
  },
  store: async (req, res) => {
    try {
      const { number } = req.body;
    } catch (e) {
      res.status(400).send({ error: e });
    }
  },
  find: async (req, res) => {},
  update: async (req, res) => {},
  remove: async (req, res) => {}
};
module.exports = RoleController;
