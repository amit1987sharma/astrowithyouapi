import { User } from '../Model/index.js';

class UserController {
  static async getMe(req, res, next) {
    try {
      const user = await User.findByPk(req.user.id, {
        attributes: ['id', 'name', 'email', 'phone', 'role', 'created_at'],
      });
      if (!user) {
        req.errorStatus = 404;
        throw new Error('User not found');
      }
      res.json({ status: true, message: 'success', data: user });
    } catch (e) {
      next(e);
    }
  }

  static async updateMe(req, res, next) {
    try {
      const { name, phone } = req.body;
      const user = await User.findByPk(req.user.id);
      if (!user) {
        req.errorStatus = 404;
        throw new Error('User not found');
      }

      if (name !== undefined) user.name = name;
      if (phone !== undefined) user.phone = phone;

      await user.save();
      res.json({
        status: true,
        message: 'Profile updated',
        data: { id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role },
      });
    } catch (e) {
      next(e);
    }
  }
}

export default UserController;