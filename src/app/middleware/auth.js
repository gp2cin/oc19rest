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

module.exports = {
  checkToken,
  generateToken
};
