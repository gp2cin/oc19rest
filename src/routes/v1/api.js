const router = require('express').Router();
const authMiddleware = require('../../app/middleware/auth');
const AuthController = require('../../app/controllers/AuthController');
const AddressController = require('../../app/controllers/AddressController');
const PhoneController = require('../../app/controllers/PhoneController');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

var APIRoutes = function(passport) {
  router.post('/signin', AuthController.signIn);
  router.post('/signup', AuthController.signUp);
  router.get('/me', authMiddleware.checkToken, AuthController.me);

  router.get('/addresses', authMiddleware.checkToken, AddressController.list);
  router.post('/addresses', authMiddleware.checkToken, AddressController.store);
  router.get('/addresses/:id', authMiddleware.checkToken, AddressController.find);
  router.put('/addresses/:id', authMiddleware.checkToken, AddressController.update);
  router.delete('/addresses/:id', authMiddleware.checkToken, AddressController.remove);

  router.get('/phones', authMiddleware.checkToken, PhoneController.list);
  router.post('/phones', authMiddleware.checkToken, PhoneController.store);
  router.get('/phones/:id', authMiddleware.checkToken, PhoneController.find);
  router.put('/phones/:id', authMiddleware.checkToken, PhoneController.update);
  router.delete('/phones/:id', authMiddleware.checkToken, PhoneController.remove);

  router.get('/besses');

  router.use('/docs', swaggerUi.serve);
  router.get('/docs', swaggerUi.setup(swaggerDocument));

  return router;
};
module.exports = APIRoutes;
