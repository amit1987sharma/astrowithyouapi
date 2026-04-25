import { AboutPage } from '../Model/index.js';

const DEFAULT_ABOUT = {
  title: 'About Us',
  subtitle: 'Your trusted platform for astrological guidance.',
  content: 'Astrologger helps users consult astrologers, manage bookings and payments, and read horoscopes. We connect you with verified astrologers for personalized readings and support.',
};

class AboutController {
  static async get(req, res, next) {
    try {
      let row = await AboutPage.findOne({ order: [['id', 'ASC']] });
      if (!row) {
        row = await AboutPage.create({
          title: DEFAULT_ABOUT.title,
          subtitle: DEFAULT_ABOUT.subtitle,
          content: DEFAULT_ABOUT.content,
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
}

export default AboutController;
