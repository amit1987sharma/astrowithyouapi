import bcrypt from 'bcrypt';
import { User } from '../Model/index.js';
import { signAccessToken } from '../Utils/jwt.js';

class AuthController {
  static async register(req, res, next) {
    try {
      const { name, email, password, phone, role } = req.body;

      if (!email || !password) {
        req.errorStatus = 400;
        throw new Error('email and password are required');
      }

      const existing = await User.findOne({ where: { email } });
      if (existing) {
        req.errorStatus = 400;
        throw new Error('Email already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        name: name || null,
        email,
        password: hashedPassword,
        phone: phone || null,
        role: role || 'user',
      });

      const token = signAccessToken(user);

      res.status(201).json({
        status: true,
        message: 'Registered successfully',
        data: { id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role },
        token,
      });
    } catch (e) {
      next(e);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        req.errorStatus = 400;
        throw new Error('email and password are required');
      }

      const user = await User.findOne({ where: { email } });
      if (!user) {
        req.errorStatus = 400;
        throw new Error('Invalid email or password');
      }

      const ok = await bcrypt.compare(password, user.password || '');
      if (!ok) {
        req.errorStatus = 400;
        throw new Error('Invalid email or password');
      }

      const token = signAccessToken(user);
      res.json({
        status: true,
        message: 'Login successful',
        data: { id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role },
        token,
      });
    } catch (e) {
      next(e);
    }
  }

  static async me(req, res, next) {
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
}

export default AuthController;

