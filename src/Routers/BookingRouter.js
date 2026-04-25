import express from 'express';
import BookingController from '../Controller/BookingController.js';
import GlobalMiddleware from '../Middleware/GlobalMiddleware.js';

const router = express.Router();

router.post('/', GlobalMiddleware.authenticate, BookingController.create);
router.get('/my', GlobalMiddleware.authenticate, BookingController.my);
router.patch('/:id/status', GlobalMiddleware.authenticate, BookingController.updateStatus);

export default router;

