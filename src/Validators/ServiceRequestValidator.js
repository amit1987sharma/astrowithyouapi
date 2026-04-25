import { body } from 'express-validator';

const SERVICE_TYPES = ['birth_chart', 'love_relationship', 'career_finance', 'marriage_matching', 'gemstone_remedy', 'personal'];

class ServiceRequestValidator {
  static create() {
    return [
      body('service_type', 'Service type is required').isIn(SERVICE_TYPES).withMessage(`service_type must be one of: ${SERVICE_TYPES.join(', ')}`),
      body('name', 'Name is required').isString().trim().notEmpty().isLength({ max: 150 }),
      body('email', 'Valid email is required').isString().trim().isEmail().normalizeEmail().notEmpty(),
      body('phone').optional().isString().trim().isLength({ max: 50 }),
      body('form_data').optional().isObject().withMessage('form_data must be an object'),
    ];
  }
}

export default ServiceRequestValidator;
