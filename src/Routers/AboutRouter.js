import express from 'express';
import AboutController from '../Controller/AboutController.js';

const router = express.Router();

router.get('/', AboutController.get);

export default router;
