import express from 'express';
import ReportController from '../Controller/ReportController.js';
import ReportValidator from '../Validators/ReportValidator.js';
import GlobalMiddleware from '../Middleware/GlobalMiddleware.js';

const router = express.Router();

router.get('/my', GlobalMiddleware.authenticate, ReportController.my);
router.get('/:id', GlobalMiddleware.authenticate, ReportController.getOne);
router.post('/', GlobalMiddleware.authenticate, ReportValidator.create(), GlobalMiddleware.checkValidationError, ReportController.create);

export default router;

