import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { User, Astrologer, Booking, Payment, ContactMessage, AboutPage, BlogPost, ServiceRequest } from '../Model/index.js';
import { slugify } from './BlogController.js';
import { generateProkeralaPdf } from '../Services/ProkeralaService.js';

class AdminController {
  static async users(req, res, next) {
    try {
      const users = await User.findAll({
        attributes: ['id', 'name', 'email', 'phone', 'role', 'created_at'],
        order: [['created_at', 'DESC']],
      });
      res.json({ status: true, message: 'success', data: users });
    } catch (e) {
      next(e);
    }
  }

  static async astrologers(req, res, next) {
    try {
      const astrologers = await Astrologer.findAll({
        include: [{ model: User, as: 'user', attributes: ['id', 'name', 'email', 'phone', 'role'] }],
        order: [['id', 'DESC']],
      });
      res.json({ status: true, message: 'success', data: astrologers });
    } catch (e) {
      next(e);
    }
  }

  static async verifyAstrologer(req, res, next) {
    try {
      const { is_verified } = req.body;
      const astrologer = await Astrologer.findByPk(req.params.id);
      if (!astrologer) {
        req.errorStatus = 404;
        throw new Error('Astrologer not found');
      }
      astrologer.is_verified = is_verified === true || is_verified === 'true' || is_verified === 1 || is_verified === '1';
      await astrologer.save();
      res.json({ status: true, message: 'Astrologer verification updated', data: astrologer });
    } catch (e) {
      next(e);
    }
  }

  static async bookings(req, res, next) {
    try {
      const bookings = await Booking.findAll({
        include: [
          { model: User, as: 'user', attributes: ['id', 'name', 'email', 'phone'] },
          {
            model: Astrologer,
            as: 'astrologer',
            include: [{ model: User, as: 'user', attributes: ['id', 'name', 'email', 'phone'] }],
          },
        ],
        order: [['created_at', 'DESC']],
      });
      res.json({ status: true, message: 'success', data: bookings });
    } catch (e) {
      next(e);
    }
  }

  static async payments(req, res, next) {
    try {
      const payments = await Payment.findAll({
        include: [
          { model: User, as: 'user', attributes: ['id', 'name', 'email', 'phone'] },
          { model: Booking, as: 'booking' },
        ],
        order: [['created_at', 'DESC']],
      });
      res.json({ status: true, message: 'success', data: payments });
    } catch (e) {
      next(e);
    }
  }

  static async contactMessages(req, res, next) {
    try {
      const messages = await ContactMessage.findAll({
        order: [['created_at', 'DESC']],
      });
      res.json({ status: true, message: 'success', data: messages });
    } catch (e) {
      next(e);
    }
  }

  static async getAbout(req, res, next) {
    try {
      let row = await AboutPage.findOne({ order: [['id', 'ASC']] });
      if (!row) {
        row = await AboutPage.create({
          title: 'About Us',
          subtitle: 'Your trusted platform for astrological guidance.',
          content: 'Astrologger helps users consult astrologers, manage bookings and payments, and read horoscopes.',
        });
      }
      res.json({
        status: true,
        data: {
          title: row.title,
          subtitle: row.subtitle,
          content: row.content,
          updated_at: row.updated_at,
        },
      });
    } catch (e) {
      next(e);
    }
  }

  static async updateAbout(req, res, next) {
    try {
      const { title, subtitle, content } = req.body;
      let row = await AboutPage.findOne({ order: [['id', 'ASC']] });
      if (!row) {
        row = await AboutPage.create({
          title: title || 'About Us',
          subtitle: subtitle || null,
          content: content || '',
        });
      } else {
        row.title = (title || row.title).trim();
        row.subtitle = subtitle != null ? String(subtitle).trim() || null : row.subtitle;
        row.content = (content ?? row.content).trim();
        row.updated_at = new Date();
        await row.save();
      }
      res.json({
        status: true,
        message: 'About page updated',
        data: {
          title: row.title,
          subtitle: row.subtitle,
          content: row.content,
          updated_at: row.updated_at,
        },
      });
    } catch (e) {
      next(e);
    }
  }

  static async listBlog(req, res, next) {
    try {
      const posts = await BlogPost.findAll({
        order: [['created_at', 'DESC']],
      });
      res.json({ status: true, data: posts });
    } catch (e) {
      next(e);
    }
  }

  static async getBlog(req, res, next) {
    try {
      const post = await BlogPost.findByPk(req.params.id);
      if (!post) {
        req.errorStatus = 404;
        throw new Error('Blog post not found');
      }
      res.json({ status: true, data: post });
    } catch (e) {
      next(e);
    }
  }

  static async createBlog(req, res, next) {
    try {
      const { title, slug, excerpt, content, image_url, status, meta_title, meta_description } = req.body;
      const slugValue = (slug && String(slug).trim()) || slugify(title || 'post');
      const post = await BlogPost.create({
        title: (title || '').trim(),
        slug: slugValue,
        excerpt: excerpt ? String(excerpt).trim() : null,
        content: (content || '').trim(),
        image_url: image_url ? String(image_url).trim() : null,
        status: status === 'published' ? 'published' : 'draft',
        meta_title: meta_title ? String(meta_title).trim() : null,
        meta_description: meta_description ? String(meta_description).trim() : null,
      });
      post.updated_at = post.created_at;
      await post.save();
      res.status(201).json({ status: true, message: 'Blog post created', data: post });
    } catch (e) {
      next(e);
    }
  }

  static async updateBlog(req, res, next) {
    try {
      const post = await BlogPost.findByPk(req.params.id);
      if (!post) {
        req.errorStatus = 404;
        throw new Error('Blog post not found');
      }
      const { title, slug, excerpt, content, image_url, status, meta_title, meta_description } = req.body;
      if (title !== undefined) post.title = String(title).trim();
      if (slug !== undefined) post.slug = slug ? String(slug).trim() : slugify(post.title || 'post');
      if (excerpt !== undefined) post.excerpt = excerpt ? String(excerpt).trim() : null;
      if (content !== undefined) post.content = String(content).trim();
      if (image_url !== undefined) post.image_url = image_url ? String(image_url).trim() : null;
      if (status !== undefined) post.status = status === 'published' ? 'published' : 'draft';
      if (meta_title !== undefined) post.meta_title = meta_title ? String(meta_title).trim() : null;
      if (meta_description !== undefined) post.meta_description = meta_description ? String(meta_description).trim() : null;
      post.updated_at = new Date();
      await post.save();
      res.json({ status: true, message: 'Blog post updated', data: post });
    } catch (e) {
      next(e);
    }
  }

  static async deleteBlog(req, res, next) {
    try {
      const post = await BlogPost.findByPk(req.params.id);
      if (!post) {
        req.errorStatus = 404;
        throw new Error('Blog post not found');
      }
      await post.destroy();
      res.json({ status: true, message: 'Blog post deleted' });
    } catch (e) {
      next(e);
    }
  }

  static async listServiceRequests(req, res, next) {
    try {
      const serviceType = req.query.service_type;
      const where = serviceType ? { service_type: serviceType } : {};
      const requests = await ServiceRequest.findAll({
        where,
        order: [['created_at', 'DESC']],
      });
      const data = requests.map((r) => {
        const row = r.toJSON ? r.toJSON() : r;
        let form_data = row.form_data;
        if (typeof form_data === 'string') {
          try {
            form_data = JSON.parse(form_data);
          } catch {
            form_data = null;
          }
        }
        return { ...row, form_data: form_data && typeof form_data === 'object' ? form_data : null };
      });
      res.json({ status: true, data });
    } catch (e) {
      next(e);
    }
  }

  static async generateServiceRequestReport(req, res, next) {
    try {
      const id = req.params.id;
      const request = await ServiceRequest.findByPk(id);
      if (!request) {
        req.errorStatus = 404;
        throw new Error('Service request not found');
      }

      const row = request.toJSON ? request.toJSON() : request;
      let formData = row.form_data;
      if (typeof formData === 'string') {
        try {
          formData = JSON.parse(formData);
        } catch {
          formData = null;
        }
      }

      request.status = 'new';
      request.error = null;
      await request.save();

      const pdfBuffer = await generateProkeralaPdf(row.service_type, formData || {});

      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      const publicFolderPath = path.resolve(__dirname, '../../public');
      const reportsDir = path.join(publicFolderPath, 'uploads', 'reports');
      await fs.promises.mkdir(reportsDir, { recursive: true });

      const safeType = String(row.service_type || 'report').replace(/[^a-z0-9_-]+/gi, '-').toLowerCase();
      const fileName = `service-request-${row.id}-${safeType}.pdf`;
      const filePath = path.join(reportsDir, fileName);

      await fs.promises.writeFile(filePath, pdfBuffer);

      const publicPath = `/uploads/reports/${fileName}`;
      request.pdf_path = publicPath;
      request.status = 'contacted';
      request.error = null;
      await request.save();

      res.json({
        status: true,
        message: 'Report generated successfully',
        data: {
          id: request.id,
          pdf_path: publicPath,
        },
      });
    } catch (e) {
      try {
        const id = req.params.id;
        const request = await ServiceRequest.findByPk(id);
        if (request) {
          request.error = e.message || String(e);
          await request.save();
        }
      } catch {
        // ignore secondary errors
      }
      next(e);
    }
  }

  static uploadBlogImage(req, res, next) {
    try {
      if (!req.processedFiles || !req.processedFiles.original) {
        req.errorStatus = 400;
        throw new Error('No image file received');
      }
      const url = '/uploads/blog/' + path.basename(req.processedFiles.original);
      res.json({ status: true, url });
    } catch (e) {
      next(e);
    }
  }

}

export default AdminController;

