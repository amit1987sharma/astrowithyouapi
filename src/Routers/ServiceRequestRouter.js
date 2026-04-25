import express from 'express';
import ServiceRequestController from '../Controller/ServiceRequestController.js';
import ServiceRequestValidator from '../Validators/ServiceRequestValidator.js';
import GlobalMiddleware from '../Middleware/GlobalMiddleware.js';

const router = express.Router();

router.post(
  '/',
  GlobalMiddleware.authenticate,
  ServiceRequestValidator.create(),
  GlobalMiddleware.checkValidationError,
  ServiceRequestController.create
);

router.get('/my', GlobalMiddleware.authenticate, ServiceRequestController.my);

export default router;
