import { Op } from 'sequelize';
import { Astrologer, User } from '../Model/index.js';

class AstrologerController {
  static async list(req, res, next) {
    try {
      const { is_verified, specialization, min_price, max_price } = req.query;

      const where = {};
      if (is_verified !== undefined) where.is_verified = is_verified === 'true' || is_verified === '1';
      if (specialization) where.specialization = { [Op.like]: `%${specialization}%` };
      if (min_price || max_price) {
        where.price_per_min = {};
        if (min_price) where.price_per_min[Op.gte] = Number(min_price);
        if (max_price) where.price_per_min[Op.lte] = Number(max_price);
      }

      const astrologers = await Astrologer.findAll({
        where,
        include: [{ model: User, as: 'user', attributes: ['id', 'name', 'email', 'phone'] }],
        order: [['rating', 'DESC']],
      });

      res.json({ status: true, message: 'success', data: astrologers });
    } catch (e) {
      next(e);
    }
  }

  static async getById(req, res, next) {
    try {
      const astrologer = await Astrologer.findByPk(req.params.id, {
        include: [{ model: User, as: 'user', attributes: ['id', 'name', 'email', 'phone'] }],
      });
      if (!astrologer) {
        req.errorStatus = 404;
        throw new Error('Astrologer not found');
      }
      res.json({ status: true, message: 'success', data: astrologer });
    } catch (e) {
      next(e);
    }
  }

  static async upsertMe(req, res, next) {
    try {
      const { bio, experience, specialization, price_per_min } = req.body;
      const userId = req.user.id;

      // If user is applying to become astrologer, set role to astrologer.
      if (req.user.role === 'user') {
        const u = await User.findByPk(userId);
        if (u) {
          u.role = 'astrologer';
          await u.save();
        }
      }

      let profile = await Astrologer.findOne({ where: { user_id: userId } });
      if (!profile) {
        profile = await Astrologer.create({
          user_id: userId,
          bio: bio || null,
          experience: experience ?? null,
          specialization: specialization || null,
          price_per_min: price_per_min ?? null,
          is_verified: false,
        });
      } else {
        if (bio !== undefined) profile.bio = bio;
        if (experience !== undefined) profile.experience = experience;
        if (specialization !== undefined) profile.specialization = specialization;
        if (price_per_min !== undefined) profile.price_per_min = price_per_min;
        await profile.save();
      }

      res.json({ status: true, message: 'Astrologer profile saved', data: profile });
    } catch (e) {
      next(e);
    }
  }
}

export default AstrologerController;

