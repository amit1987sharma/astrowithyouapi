import { ServiceRequest } from '../Model/index.js';

class ServiceRequestController {
  static async create(req, res, next) {
    try {
      const { service_type, name, email, phone, form_data } = req.body;
      const request = await ServiceRequest.create({
        user_id: req.user?.id || null,
        service_type: String(service_type || '').trim(),
        name: String(name || '').trim(),
        email: String(email || '').trim().toLowerCase(),
        phone: phone ? String(phone).trim() : null,
        form_data: form_data && typeof form_data === 'object' ? form_data : null,
        status: 'new',
      });
      res.status(201).json({
        status: true,
        message: 'Thank you. We will contact you soon.',
        data: { id: request.id },
      });
    } catch (e) {
      next(e);
    }
  }

  static async my(req, res, next) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        req.errorStatus = 401;
        throw new Error('Unauthorized');
      }
      const rows = await ServiceRequest.findAll({
        where: { user_id: userId },
        order: [['created_at', 'DESC']],
      });
      res.json({ status: true, data: rows });
    } catch (e) {
      next(e);
    }
  }
}

export default ServiceRequestController;
