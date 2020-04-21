const { User } = require('../models/User');
const { Individual } = require('../models/Individual');

const UserController = {
  store: async (req, res) => {
    const { password, first_name, last_name, email, gender, birthdate } = req.body;
    try {
      if (!(password || first_name || email))
        res.status(404).send({ error: 'First name, email and password are required.' });
      const searchUser = await User.findOne({ email });
      if (searchUser) {
        res.status(400).send({ error: 'User alredy exists.' });
      } else {
        const user = await User.create({ password, first_name, last_name, email, active: true });
        if (user) {
          const individual = await Individual.create({
            gender,
            birthdate,
            user: user._id,
            active: true
          });
          individual._id = individual.__id;
          await individual.save();
          user.individual = individual;
          await user.save();
          user.password = undefined;
          res.status(201).send({ user, token: authMiddleware.generateToken({ id: user.id }) });
        }
      }
    } catch (e) {
      res.status(400).send({
        message: 'Registration failed',
        error: e.errmsg
      });
    }
  },

  find: async (req, res) => {
    const user = await User.find();
    return res.send(user);
  },
  remove: async (req, res) => {}
};

module.exports = new UserController();
