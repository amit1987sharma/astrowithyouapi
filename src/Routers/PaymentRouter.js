import express from 'express';
import PaymentController from '../Controller/PaymentController.js';
import GlobalMiddleware from '../Middleware/GlobalMiddleware.js';

const router = express.Router();

router.post('/', GlobalMiddleware.authenticate, PaymentController.create);
router.get('/my', GlobalMiddleware.authenticate, PaymentController.my);

export default router;

