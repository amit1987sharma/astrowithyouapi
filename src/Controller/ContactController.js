import { ContactMessage } from '../Model/index.js';

class ContactController {
  static async submit(req, res, next) {
    try {
      const { name, email, phone, subject, message } = req.body;

      const contact = await ContactMessage.create({
        name: (name || '').trim(),
        email: (email || '').trim().toLowerCase(),
        phone: phone ? String(phone).trim() : null,
        subject: (subject || '').trim(),
        message: (message || '').trim(),
        status: 'new',
      });

      res.status(201).json({
        status: true,
        message: 'Thank you for contacting us. We will get back to you soon.',
        data: { id: contact.id },
      });
    } catch (e) {
      next(e);
    }
  }
}

export default ContactController;
