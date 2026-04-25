import { body } from 'express-validator';

class BlogValidator {
  static create() {
    return [
      body('title', 'Title is required').isString().trim().notEmpty().isLength({ max: 255 }).withMessage('Title must be at most 255 characters'),
      body('slug').optional().isString().trim().isLength({ max: 255 }).withMessage('Slug must be at most 255 characters'),
      body('excerpt').optional().isString().trim().isLength({ max: 500 }).withMessage('Excerpt must be at most 500 characters'),
      body('content', 'Content is required').isString().trim().notEmpty().isLength({ max: 100000 }).withMessage('Content must be at most 100000 characters'),
      body('image_url').optional().isString().trim().isLength({ max: 500 }),
      body('status').optional().isIn(['draft', 'published']).withMessage('Status must be draft or published'),
      body('meta_title').optional().isString().trim().isLength({ max: 255 }),
      body('meta_description').optional().isString().trim().isLength({ max: 500 }),
    ];
  }

  static update() {
    return [
      body('title').optional().isString().trim().notEmpty().isLength({ max: 255 }).withMessage('Title must be at most 255 characters'),
      body('slug').optional().isString().trim().isLength({ max: 255 }).withMessage('Slug must be at most 255 characters'),
      body('excerpt').optional().isString().trim().isLength({ max: 500 }).withMessage('Excerpt must be at most 500 characters'),
      body('content').optional().isString().trim().isLength({ max: 100000 }).withMessage('Content must be at most 100000 characters'),
      body('image_url').optional().isString().trim().isLength({ max: 500 }),
      body('status').optional().isIn(['draft', 'published']).withMessage('Status must be draft or published'),
      body('meta_title').optional().isString().trim().isLength({ max: 255 }),
      body('meta_description').optional().isString().trim().isLength({ max: 500 }),
    ];
  }
}

export default BlogValidator;
