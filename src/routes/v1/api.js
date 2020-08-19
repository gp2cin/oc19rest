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
const GeneralObservationController = require('../../app/controllers/GeneralObservationController');
const AWSBucketController = require('../../app/controllers/AWSBucketController');
const UserController = require('../../app/controllers/UserController');
const DashboardController = require('../../app/controllers/DashboardController');

const updateGoogleSpreadsheet = require('../../utils/googleSpreadsheets/updateSpreadsheet');
// const csv = require('../../utils/csv/insertObserver');

var APIRoutes = function (passport) {
  // csv();
  updateGoogleSpreadsheet.start(); //atualização das planilhas do Google Spreadsheet

  router.post('/signin', AuthController.signIn);
  router.post('/signup', AuthController.signUp);
  // router.post('/signupObserver', AuthController.signUpObserver);
  // router.post('/signupAnalyst', AuthController.signUpAnalyst);
  router.get('/me', authMiddleware.checkToken, AuthController.me);
  router.put('/me/change-password', authMiddleware.checkToken, AuthController.changePassword);

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

  router.post(
    '/observer-report',
    authMiddleware.checkToken,
    authMiddleware.allowOnly(['OBSERVER'], ObserverReportController.store)
  );
  router.get('/observer-report', ObserverReportController.list);

  router.post('/general-observation', GeneralObservationController.store);
  router.post('/general-observation-auth', authMiddleware.checkToken, GeneralObservationController.store);
  router.get('/general-observations', GeneralObservationController.list);

  router.get('/cases/map', CasesController.map);
  router.get('/cases', CasesController.confirmed);
  router.get('/cases/state', CasesController.find);

  router.get('/neighborhoods', NeighborController.list);

  router.use('/docs', swaggerUi.serve);
  router.get('/docs', swaggerUi.setup(swaggerDocument));

  router.get('/generate-get-url', AWSBucketController.getURL);
  router.get('/generate-put-url', AWSBucketController.putURL);

  router.get('/list-users', authMiddleware.checkToken, authMiddleware.allowOnly(['ANALYST'], UserController.list));

  //Dashboard
  router.get(
    '/dashboard/statistics',
    authMiddleware.checkToken,
    authMiddleware.allowOnly(['ANALYST'], DashboardController.statistics)
  );
  router.get(
    '/dashboard/filters',
    authMiddleware.checkToken,
    authMiddleware.allowOnly(['ANALYST'], DashboardController.filters)
  );

  return router;
};
module.exports = APIRoutes;
