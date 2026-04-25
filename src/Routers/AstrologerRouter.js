import express from 'express';
import AstrologerController from '../Controller/AstrologerController.js';
import GlobalMiddleware from '../Middleware/GlobalMiddleware.js';

const router = express.Router();

router.get('/', AstrologerController.list);
router.get('/:id', AstrologerController.getById);

// Create/Update astrologer profile for logged-in user
router.post('/me', GlobalMiddleware.authenticate, AstrologerController.upsertMe);
router.put('/me', GlobalMiddleware.authenticate, AstrologerController.upsertMe);

export default router;

