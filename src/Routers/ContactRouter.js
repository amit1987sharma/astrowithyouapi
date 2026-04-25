import express from 'express';
import ContactController from '../Controller/ContactController.js';
import ContactValidator from '../Validators/ContactValidator.js';
import GlobalMiddleware from '../Middleware/GlobalMiddleware.js';

const router = express.Router();

router.post('/', ContactValidator.submit(), GlobalMiddleware.checkValidationError, ContactController.submit);

export default router;
