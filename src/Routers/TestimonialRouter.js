import express from 'express';
import TestimonialController from '../Controller/TestimonialController.js';

const router = express.Router();

router.get('/', TestimonialController.listPublic);

export default router;
