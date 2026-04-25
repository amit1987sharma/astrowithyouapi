import express from 'express';
import AuthController from '../Controller/AuthController.js';
import GlobalMiddleware from '../Middleware/GlobalMiddleware.js';

const router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/me', GlobalMiddleware.authenticate, AuthController.me);

export default router;

