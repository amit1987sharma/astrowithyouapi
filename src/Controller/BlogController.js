import { BlogPost } from '../Model/index.js';

function slugify(text) {
  return String(text)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-|-$/g, '');
}

class BlogController {
  static async list(req, res, next) {
    try {
      const page = Math.max(1, parseInt(req.query.page, 10) || 1);
      const limit = Math.min(50, Math.max(1, parseInt(req.query.limit, 10) || 10));
      const offset = (page - 1) * limit;

      const { count, rows } = await BlogPost.findAndCountAll({
        where: { status: 'published' },
        order: [['created_at', 'DESC']],
        limit,
        offset,
        attributes: ['id', 'title', 'slug', 'excerpt', 'image_url', 'created_at'],
      });

      res.json({
        status: true,
        data: rows,
        pagination: {
          page,
          limit,
          total: count,
          total_pages: Math.ceil(count / limit) || 1,
        },
      });
    } catch (e) {
      next(e);
    }
  }

  static async get(req, res, next) {
    try {
      const idOrSlug = req.params.idOrSlug;
      const isNumeric = /^\d+$/.test(idOrSlug);
      const where = isNumeric ? { id: parseInt(idOrSlug, 10) } : { slug: idOrSlug };
      const post = await BlogPost.findOne({
        where: { ...where, status: 'published' },
      });
      if (!post) {
        req.errorStatus = 404;
        throw new Error('Post not found');
      }
      res.json({ status: true, data: post });
    } catch (e) {
      next(e);
    }
  }
}

export default BlogController;
export { slugify };
