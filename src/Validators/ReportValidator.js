import { body } from 'express-validator';

class ReportValidator {
  static create() {
    return [
      body('type', 'type is required').isIn(['birth_chart', 'compatibility']).withMessage('type must be birth_chart or compatibility'),
      body('report_url').optional({ values: 'falsy' }).isString().trim().isLength({ max: 500 }),
    ];
  }
}

export default ReportValidator;
