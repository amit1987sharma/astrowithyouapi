import { body } from 'express-validator';

class AboutValidator {
  static update() {
    return [
      body('title', 'Title is required').isString().trim().notEmpty().isLength({ max: 255 }).withMessage('Title must be at most 255 characters'),
      body('subtitle').optional().isString().trim().isLength({ max: 500 }).withMessage('Subtitle must be at most 500 characters'),
      body('content', 'Content is required').isString().trim().notEmpty().isLength({ max: 50000 }).withMessage('Content must be at most 50000 characters'),
    ];
  }
}

export default AboutValidator;
