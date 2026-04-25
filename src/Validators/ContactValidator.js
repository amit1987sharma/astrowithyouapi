import { body } from 'express-validator';

class ContactValidator {
  static submit() {
    return [
      body('name', 'Name is required').isString().trim().notEmpty().isLength({ max: 150 }).withMessage('Name must be at most 150 characters'),
      body('email', 'Valid email is required').isString().trim().isEmail().normalizeEmail().notEmpty(),
      body('phone').optional().isString().trim().isLength({ max: 50 }).withMessage('Phone must be at most 50 characters'),
      body('subject', 'Subject is required').isString().trim().notEmpty().isLength({ max: 255 }).withMessage('Subject must be at most 255 characters'),
      body('message', 'Message is required').isString().trim().notEmpty().isLength({ max: 5000 }).withMessage('Message must be at most 5000 characters'),
    ];
  }
}

export default ContactValidator;
