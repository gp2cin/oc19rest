const { User } = require('../models/User');

let jwt = require('jsonwebtoken');
const config = require('../../config/auth');

const generateToken = (params = {}) => {
  return jwt.sign(params, config.secret, {
    expiresIn: 86400
  });
};

const checkToken = (req, res, next) => {
  let authHeader = req.headers.authorization;
  if (!authHeader) res.status(401).send({ error: 'No token provided.' });
  const parts = authHeader.split(' ');
  if (!parts.length === 2) res.status(401).send({ error: 'Invalid token.' });
  const [scheme, token] = parts;
  if (!/^Bearer$/i.test(scheme)) res.status(401).send({ error: 'Token malformed.' });

  // let token = req.headers['x-access-token'] || req.headers['authorization'];
  // Express headers are auto converted to lowercase

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: 'Token is not valid'
      });
    } else {
      req.decoded = decoded;
      next();
    }
  });
};

const allowOnly = (minAccessLevel, callback) => {
  async function checkRole(req, res) {
    const { id } = req.decoded;
    const user = await User.findOne({
      _id: id
    });
    if (!user) res.status(400).send({ message: 'User not found.' });
    user.__v = undefined;
    console.log(minAccessLevel);
    console.log(user.role.name);
    if (minAccessLevel.includes(user.role.name)) {
      console.log('AUTORIZADO');
      req.user = user;
      callback(req, res);
    } else {
      res.status(401).send({ message: 'Unauthorized' })
    }
  }
  return checkRole;
}

module.exports = {
  checkToken,
  generateToken,
  allowOnly
};
