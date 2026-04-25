import express from  'express'
import cors from 'cors';
import sequelize from './Config/sequelize.js';
import path from 'path';
import { fileURLToPath } from 'url';

import AuthRouter from './Routers/AuthRouter.js';
import UserRouter from './Routers/UserRouter.js';
import AstrologerRouter from './Routers/AstrologerRouter.js';
import BookingRouter from './Routers/BookingRouter.js';
import PaymentRouter from './Routers/PaymentRouter.js';
import AdminRouter from './Routers/AdminRouter.js';
import HoroscopeRouter from './Routers/HoroscopeRouter.js';
import ReportRouter from './Routers/ReportRouter.js';
import ContactRouter from './Routers/ContactRouter.js';
import AboutRouter from './Routers/AboutRouter.js';
import BlogRouter from './Routers/BlogRouter.js';
import ServiceRequestRouter from './Routers/ServiceRequestRouter.js';
class Server{
    app = ''
    constructor(){
        this.app = express();
        this.setConfiguration();
        this.setRoutes();
        this.handle404();
        this.handleError();
    }

    setConfiguration(){
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const publicFolderPath = path.resolve(__dirname, '../public');
        
        this.setConnection();
        this.app.enable('trust proxy');
        this.app.use(cors());
        this.app.use('/uploads',express.static(path.join(publicFolderPath, 'uploads')));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        
    }
    setConnection(){
        // IMPORTANT: your tables already exist in DB ("ast") so we only authenticate.
        sequelize.authenticate()
            .then(() => console.log('Database connected'))
            .catch((err) => console.error('DB Connection Error:', err));
    }
    setRoutes(){
        this.app.get('/api/health', (req, res) => res.json({ status: true, message: 'ok' }));

        this.app.use('/api/auth', AuthRouter);
        this.app.use('/api/users', UserRouter);
        this.app.use('/api/astrologers', AstrologerRouter);
        this.app.use('/api/bookings', BookingRouter);
        this.app.use('/api/payments', PaymentRouter);
        this.app.use('/api/admin', AdminRouter);
        this.app.use('/api/horoscopes', HoroscopeRouter);
        this.app.use('/api/reports', ReportRouter);
        this.app.use('/api/contact', ContactRouter);
        this.app.use('/api/about', AboutRouter);
        this.app.use('/api/blog', BlogRouter);
        this.app.use('/api/service-requests', ServiceRequestRouter);
    }

    handle404(){
        this.app.use((req,res,next)=>{
                res.status(404).json({
                    status:404,
                    message:'Not Found'
                })
        })
    }

    handleError(){
        this.app.use((error,req,res,next)=>{
            const errorStatus = req.errorStatus || 500;
            res.status(errorStatus).json({
                status:errorStatus,
                message:error.message || 'Internal Server Error'
            })
        })
    }
}

export default Server;