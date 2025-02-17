const { User } = require('../models/User');
//const { Individual } = require('../models/Individual');

const UserController = {
  // store: async (req, res) => {
  //   const { password, first_name, last_name, email, gender, birthdate } = req.body;
  //   try {
  //     if (!(password || first_name || email))
  //       res.status(404).send({ error: 'First name, email and password are required.' });
  //     const searchUser = await User.findOne({ email });
  //     if (searchUser) {
  //       res.status(400).send({ error: 'User alredy exists.' });
  //     } else {
  //       const user = await User.create({ password, first_name, last_name, email, active: true });
  //       if (user) {
  //         const individual = await Individual.create({
  //           gender,
  //           birthdate,
  //           user: user._id,
  //           active: true
  //         });
  //         individual._id = individual.__id;
  //         await individual.save();
  //         user.individual = individual;
  //         await user.save();
  //         user.password = undefined;
  //         res.status(201).send({ user, token: authMiddleware.generateToken({ id: user.id }) });
  //       }
  //     }
  //   } catch (e) {
  //     res.status(400).send({
  //       message: 'Registration failed',
  //       error: e.errmsg
  //     });
  //   }
  // },

  find: async (req, res) => {
    const user = await User.find();
    return res.send(user);
  },
  // remove: async (req, res) => {}
  list: async (req, res) => {
    try {
      lmt = 20;
      ofst = 0; // tamanho da página
      pg = 1;
      const { page, limit, offset } = req.query;
      if (limit) {
        lmt = parseInt(limit);
      }
      if (offset) {
        ofst = offset;
      }
      if (page) {
        ofst = (parseInt(page) - 1) * lmt;
      }

      const count = await User.count({
        active: true,
      });

      const users = await User.find({
        active: true,
      })
        .limit(lmt)
        .skip(ofst);
      if (users)
        res.status(200).send({
          users,
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
};

module.exports = UserController;
