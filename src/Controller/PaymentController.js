import { Payment, Booking } from '../Model/index.js';

class PaymentController {
  static async create(req, res, next) {
    try {
      const { booking_id, amount, payment_method, payment_status } = req.body;
      if (!booking_id || amount === undefined || !payment_status) {
        req.errorStatus = 400;
        throw new Error('booking_id, amount, payment_status are required');
      }

      const booking = await Booking.findByPk(booking_id);
      if (!booking) {
        req.errorStatus = 404;
        throw new Error('Booking not found');
      }
      if (req.user.role === 'user' && booking.user_id !== req.user.id) {
        req.errorStatus = 403;
        throw new Error('Forbidden');
      }

      const payment = await Payment.create({
        booking_id,
        user_id: req.user.id,
        amount,
        payment_method: payment_method || null,
        payment_status,
      });

      res.status(201).json({ status: true, message: 'Payment recorded', data: payment });
    } catch (e) {
      next(e);
    }
  }

  static async my(req, res, next) {
    try {
      const payments = await Payment.findAll({
        where: { user_id: req.user.id },
        order: [['created_at', 'DESC']],
      });
      res.json({ status: true, message: 'success', data: payments });
    } catch (e) {
      next(e);
    }
  }
}

export default PaymentController;

