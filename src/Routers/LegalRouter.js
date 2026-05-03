import express from 'express';
import LegalPageController from '../Controller/LegalPageController.js';

const router = express.Router();

router.get('/:slug', LegalPageController.getBySlug);

export default router;
