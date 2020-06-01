const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const authMiddleware = require('../../app/middleware/auth');

const AuthController = require('../../app/controllers/AuthController');
const PhoneController = require('../../app/controllers/PhoneController');
const AddressController = require('../../app/controllers/AddressController');
const WarningController = require('../../app/controllers/WarningController');
const ObserverReportController = require('../../app/controllers/ObserverReportController');
const CasesController = require('../../app/controllers/CasesController');
const NeighborController = require('../../app/controllers/NeighborController');

const updateGoogleSpreadsheet = require('../../googleSpreadsheets/updateSpreadsheet');
var APIRoutes = function (passport) {
  updateGoogleSpreadsheet.start(); //atualização das planilhas do Google Spreadsheet

  router.post('/signin', AuthController.signIn);
  router.post('/signup', AuthController.signUp);
  //router.post('/signupObserver', AuthController.signUpObserver);
  router.get('/me', authMiddleware.checkToken, AuthController.me);
  router.post('/me/change-password', authMiddleware.checkToken, AuthController.changePassword);

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

  router.post('/warnings', authMiddleware.checkToken, WarningController.store);
  router.get('/warnings/map', WarningController.map);
  router.get('/warnings', WarningController.list);

  router.post(
    '/observer-report',
    authMiddleware.checkToken,
    authMiddleware.allowOnly(['OBSERVER'], ObserverReportController.store)
  );
  router.get('/observer-report', ObserverReportController.list);

  router.get('/cases/map', CasesController.map);
  router.get('/cases', CasesController.confirmed);
  router.get('/cases/state', CasesController.find);

  router.get('/neighborhoods', NeighborController.list);

  router.use('/docs', swaggerUi.serve);
  router.get('/docs', swaggerUi.setup(swaggerDocument));

  return router;
};
module.exports = APIRoutes;
