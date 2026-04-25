import { Booking, Astrologer, User } from '../Model/index.js';

class BookingController {
  static async create(req, res, next) {
    try {
      const { astrologer_id, booking_date, booking_time } = req.body;
      if (!astrologer_id || !booking_date || !booking_time) {
        req.errorStatus = 400;
        throw new Error('astrologer_id, booking_date, booking_time are required');
      }

      const astrologer = await Astrologer.findByPk(astrologer_id);
      if (!astrologer) {
        req.errorStatus = 404;
        throw new Error('Astrologer not found');
      }
      if (!astrologer.is_verified) {
        req.errorStatus = 400;
        throw new Error('Astrologer is not verified');
      }

      const booking = await Booking.create({
        user_id: req.user.id,
        astrologer_id,
        booking_date,
        booking_time,
        status: 'pending',
      });

      res.status(201).json({ status: true, message: 'Booking created', data: booking });
    } catch (e) {
      next(e);
    }
  }

  static async my(req, res, next) {
    try {
      const role = req.user.role;

      let where;
      if (role === 'astrologer') {
        const profile = await Astrologer.findOne({ where: { user_id: req.user.id } });
        if (!profile) {
          res.json({ status: true, message: 'success', data: [] });
          return;
        }
        where = { astrologer_id: profile.id };
      } else {
        where = { user_id: req.user.id };
      }

      const bookings = await Booking.findAll({
        where,
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

  static async updateStatus(req, res, next) {
    try {
      const { status } = req.body;
      const booking = await Booking.findByPk(req.params.id);
      if (!booking) {
        req.errorStatus = 404;
        throw new Error('Booking not found');
      }

      const role = req.user.role;

      if (role === 'user') {
        if (booking.user_id !== req.user.id) {
          req.errorStatus = 403;
          throw new Error('Forbidden');
        }
        if (status !== 'cancelled') {
          req.errorStatus = 400;
          throw new Error('User can only cancel booking');
        }
      }

      if (role === 'astrologer') {
        const profile = await Astrologer.findOne({ where: { user_id: req.user.id } });
        if (!profile || booking.astrologer_id !== profile.id) {
          req.errorStatus = 403;
          throw new Error('Forbidden');
        }
      }

      booking.status = status;
      await booking.save();
      res.json({ status: true, message: 'Booking status updated', data: booking });
    } catch (e) {
      next(e);
    }
  }
}

export default BookingController;

