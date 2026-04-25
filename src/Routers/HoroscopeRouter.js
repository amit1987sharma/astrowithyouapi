import express from 'express';
import HoroscopeController from '../Controller/HoroscopeController.js';
import GlobalMiddleware from '../Middleware/GlobalMiddleware.js';

const router = express.Router();

router.get('/', HoroscopeController.list);
router.get('/:zodiac_sign', HoroscopeController.getBySign);

router.post('/', GlobalMiddleware.authenticate, GlobalMiddleware.requireRole(['admin']), HoroscopeController.create);
router.put('/:id', GlobalMiddleware.authenticate, GlobalMiddleware.requireRole(['admin']), HoroscopeController.update);

export default router;

