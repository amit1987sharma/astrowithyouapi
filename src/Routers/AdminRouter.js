import express from 'express';
import AdminController from '../Controller/AdminController.js';
import AboutValidator from '../Validators/AboutValidator.js';
import LegalPageValidator from '../Validators/LegalPageValidator.js';
import BlogValidator from '../Validators/BlogValidator.js';
import GlobalMiddleware from '../Middleware/GlobalMiddleware.js';
import { upload, processImage } from '../Middleware/Upload.js';

const router = express.Router();

router.use(GlobalMiddleware.authenticate, GlobalMiddleware.requireRole(['admin']));

// Blog image upload (multipart) - must be before /blog/:id
router.post(
  '/upload/blog',
  (req, res, next) => { req.destination = 'blog'; next(); },
  upload.single('image'),
  processImage,
  AdminController.uploadBlogImage
);

router.get('/users', AdminController.users);
router.get('/astrologers', AdminController.astrologers);
router.patch('/astrologers/:id/verify', AdminController.verifyAstrologer);
router.get('/bookings', AdminController.bookings);
router.get('/payments', AdminController.payments);
router.get('/contact-messages', AdminController.contactMessages);
router.get('/about', AdminController.getAbout);
router.put('/about', AboutValidator.update(), GlobalMiddleware.checkValidationError, AdminController.updateAbout);
router.get('/legal/:slug', AdminController.getLegal);
router.put('/legal/:slug', LegalPageValidator.update(), GlobalMiddleware.checkValidationError, AdminController.updateLegal);
router.get('/blog', AdminController.listBlog);
router.get('/blog/:id', AdminController.getBlog);
router.post('/blog', BlogValidator.create(), GlobalMiddleware.checkValidationError, AdminController.createBlog);
router.put('/blog/:id', BlogValidator.update(), GlobalMiddleware.checkValidationError, AdminController.updateBlog);
router.delete('/blog/:id', AdminController.deleteBlog);
router.get('/service-requests', AdminController.listServiceRequests);
router.post('/service-requests/:id/generate', AdminController.generateServiceRequestReport);

export default router;

