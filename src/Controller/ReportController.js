import { Report } from '../Model/index.js';

class ReportController {
  static async my(req, res, next) {
    try {
      const reports = await Report.findAll({
        where: { user_id: req.user.id },
        order: [['created_at', 'DESC']],
      });
      res.json({ status: true, message: 'success', data: reports });
    } catch (e) {
      next(e);
    }
  }

  static async getOne(req, res, next) {
    try {
      const report = await Report.findByPk(req.params.id);
      if (!report || report.user_id !== req.user.id) {
        req.errorStatus = 404;
        throw new Error('Report not found');
      }
      res.json({ status: true, data: report });
    } catch (e) {
      next(e);
    }
  }

  static async create(req, res, next) {
    try {
      const { type, report_url } = req.body;
      if (!type) {
        req.errorStatus = 400;
        throw new Error('type is required');
      }
      const report = await Report.create({
        user_id: req.user.id,
        type,
        report_url: report_url || null,
      });
      res.status(201).json({ status: true, message: 'Report created', data: report });
    } catch (e) {
      next(e);
    }
  }
}

export default ReportController;

