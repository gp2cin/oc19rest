const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const authMiddleware = require('../../app/middleware/auth');

const AuthController = require('../../app/controllers/AuthController');
const PhoneController = require('../../app/controllers/PhoneController');
const AddressController = require('../../app/controllers/AddressController');
const WarningController = require('../../app/controllers/WarningController');
const OfficialCasesController = require('../../app/controllers/OfficialCasesController');
const CrowdCasesController = require('../../app/controllers/CrowdCasesController')

const updateGoogleSpreadsheet = require('../../googleSpreadsheets/updateSpreadsheet');

var APIRoutes = function (passport) {
  updateGoogleSpreadsheet.start(); //atualização das planilhas do Google Spreadsheet

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

  router.post('/warnings', WarningController.store);
  router.get('/warnings/map', WarningController.map);
  router.get('/warnings', WarningController.list);

  router.get('/cases/official', OfficialCasesController.list);
  router.get('/cases/official/state', OfficialCasesController.find);

  router.get('/cases/crowd', CrowdCasesController.list);
  //router.get('/cases/official/state', OfficialCasesController.find);

  router.use('/docs', swaggerUi.serve);
  router.get('/docs', swaggerUi.setup(swaggerDocument));

  return router;
};
module.exports = APIRoutes;
