import { body, param } from 'express-validator';
import { ALLOWED_SLUGS } from '../Controller/LegalPageController.js';

class LegalPageValidator {
  static update() {
    return [
      param('slug', 'Invalid page')
        .isString()
        .trim()
        .isIn(ALLOWED_SLUGS)
        .withMessage('Invalid legal page slug'),
      body('title', 'Title is required').isString().trim().notEmpty().isLength({ max: 255 }).withMessage('Title must be at most 255 characters'),
      body('content', 'Content is required').isString().trim().notEmpty().isLength({ max: 100000 }).withMessage('Content must be at most 100000 characters'),
    ];
  }
}

export default LegalPageValidator;
