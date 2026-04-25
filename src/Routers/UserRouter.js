import express from 'express';
import UserController from '../Controller/UserController.js';
import GlobalMiddleware from '../Middleware/GlobalMiddleware.js';

const router = express.Router();

router.get('/me', GlobalMiddleware.authenticate, UserController.getMe);
router.put('/me', GlobalMiddleware.authenticate, UserController.updateMe);

export default router;