import express from 'express';
import BlogController from '../Controller/BlogController.js';

const router = express.Router();

router.get('/', BlogController.list);
router.get('/:idOrSlug', BlogController.get);

export default router;
