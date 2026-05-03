import { Testimonial } from '../Model/index.js';

const PUBLIC_ATTRS = ['id', 'quote', 'name', 'city', 'avatar_url'];

class TestimonialController {
  /** Public: published only, ordered for carousel */
  static async listPublic(req, res, next) {
    try {
      const rows = await Testimonial.findAll({
        where: { is_published: true },
        order: [
          ['sort_order', 'ASC'],
          ['id', 'ASC'],
        ],
        attributes: PUBLIC_ATTRS,
      });
      res.json({ status: true, data: rows });
    } catch (e) {
      next(e);
    }
  }

  /** Admin: all rows */
  static async listAll(req, res, next) {
    try {
      const rows = await Testimonial.findAll({
        order: [
          ['sort_order', 'ASC'],
          ['id', 'ASC'],
        ],
      });
      res.json({ status: true, data: rows });
    } catch (e) {
      next(e);
    }
  }

  static async create(req, res, next) {
    try {
      const { quote, name, city, avatar_url, sort_order, is_published } = req.body;
      const row = await Testimonial.create({
        quote: String(quote || '').trim(),
        name: String(name || '').trim(),
        city: city != null && String(city).trim() ? String(city).trim() : null,
        avatar_url: avatar_url != null && String(avatar_url).trim() ? String(avatar_url).trim() : null,
        sort_order: Number.isFinite(Number(sort_order)) ? Number(sort_order) : 0,
        is_published: is_published === false || is_published === 'false' || is_published === 0 ? false : true,
      });
      res.status(201).json({ status: true, message: 'Testimonial created', data: row });
    } catch (e) {
      next(e);
    }
  }

  static async update(req, res, next) {
    try {
      const row = await Testimonial.findByPk(req.params.id);
      if (!row) {
        req.errorStatus = 404;
        throw new Error('Testimonial not found');
      }
      const { quote, name, city, avatar_url, sort_order, is_published } = req.body;
      if (quote !== undefined) row.quote = String(quote).trim();
      if (name !== undefined) row.name = String(name).trim();
      if (city !== undefined) row.city = city == null || String(city).trim() === '' ? null : String(city).trim();
      if (avatar_url !== undefined) {
        row.avatar_url = avatar_url == null || String(avatar_url).trim() === '' ? null : String(avatar_url).trim();
      }
      if (sort_order !== undefined) row.sort_order = Number.isFinite(Number(sort_order)) ? Number(sort_order) : row.sort_order;
      if (is_published !== undefined) {
        row.is_published = is_published === false || is_published === 'false' || is_published === 0 ? false : true;
      }
      row.updated_at = new Date();
      await row.save();
      res.json({ status: true, message: 'Testimonial updated', data: row });
    } catch (e) {
      next(e);
    }
  }

  static async destroy(req, res, next) {
    try {
      const row = await Testimonial.findByPk(req.params.id);
      if (!row) {
        req.errorStatus = 404;
        throw new Error('Testimonial not found');
      }
      await row.destroy();
      res.json({ status: true, message: 'Testimonial deleted' });
    } catch (e) {
      next(e);
    }
  }
}

export default TestimonialController;
