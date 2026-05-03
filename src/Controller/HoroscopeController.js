import { Horoscope } from '../Model/index.js';

class HoroscopeController {
  static async list(req, res, next) {
    try {
      const items = await Horoscope.findAll({ order: [['created_at', 'DESC']] });
      res.json({ status: true, message: 'success', data: items });
    } catch (e) {
      next(e);
    }
  }

  static async getBySign(req, res, next) {
    try {
      const zodiac_sign = req.params.zodiac_sign;
      const item = await Horoscope.findOne({
        where: { zodiac_sign },
        order: [['created_at', 'DESC']],
      });
      if (!item) {
        req.errorStatus = 404;
        throw new Error('Horoscope not found');
      }
      res.json({ status: true, message: 'success', data: item });
    } catch (e) {
      next(e);
    }
  }

  static async create(req, res, next) {
    try {
      const { zodiac_sign, daily, weekly, monthly } = req.body;
      if (!zodiac_sign) {
        req.errorStatus = 400;
        throw new Error('zodiac_sign is required');
      }
      const item = await Horoscope.create({ zodiac_sign, daily: daily || null, weekly: weekly || null, monthly: monthly || null });
      res.status(201).json({ status: true, message: 'Horoscope created', data: item });
    } catch (e) {
      next(e);
    }
  }

  static async update(req, res, next) {
    try {
      const item = await Horoscope.findByPk(req.params.id);
      if (!item) {
        req.errorStatus = 404;
        throw new Error('Horoscope not found');
      }
      const { zodiac_sign, daily, weekly, monthly } = req.body;
      if (zodiac_sign !== undefined) item.zodiac_sign = zodiac_sign;
      if (daily !== undefined) item.daily = daily;
      if (weekly !== undefined) item.weekly = weekly;
      if (monthly !== undefined) item.monthly = monthly;
      await item.save();
      res.json({ status: true, message: 'Horoscope updated', data: item });
    } catch (e) {
      next(e);
    }
  }

  static async destroy(req, res, next) {
    try {
      const item = await Horoscope.findByPk(req.params.id);
      if (!item) {
        req.errorStatus = 404;
        throw new Error('Horoscope not found');
      }
      await item.destroy();
      res.json({ status: true, message: 'Horoscope deleted' });
    } catch (e) {
      next(e);
    }
  }
}

export default HoroscopeController;

