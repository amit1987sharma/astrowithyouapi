import { body } from 'express-validator';

class TestimonialValidator {
  static create() {
    return [
      body('quote', 'Quote is required').isString().trim().notEmpty().isLength({ max: 8000 }).withMessage('Quote is too long'),
      body('name', 'Name is required').isString().trim().notEmpty().isLength({ max: 120 }),
      body('city').optional({ nullable: true }).isString().trim().isLength({ max: 120 }),
      body('avatar_url')
        .optional({ nullable: true })
        .custom((v) => v == null || (typeof v === 'string' && v.trim().length <= 500))
        .withMessage('Avatar URL is invalid'),
      body('sort_order').optional().isInt({ min: -999999, max: 999999 }),
      body('is_published').optional().isBoolean(),
    ];
  }

  static update() {
    return [
      body('quote').optional().isString().trim().notEmpty().isLength({ max: 8000 }),
      body('name').optional().isString().trim().notEmpty().isLength({ max: 120 }),
      body('city').optional({ nullable: true }).isString().trim().isLength({ max: 120 }),
      body('avatar_url')
        .optional({ nullable: true })
        .custom((v) => v == null || (typeof v === 'string' && v.trim().length <= 500))
        .withMessage('Avatar URL is invalid'),
      body('sort_order').optional().isInt({ min: -999999, max: 999999 }),
      body('is_published').optional().isBoolean(),
    ];
  }
}

export default TestimonialValidator;
