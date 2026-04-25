import { validationResult } from "express-validator";
import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';
class GlobalMiddleware{


    static setUserDestination(req,res,next){
        req.destination = 'users';
        next();
    }
    static setEstablishmentDestination(req,res,next){
        req.destination = 'establishments';
        next();
    }
    static setEstablishmentReviewDestination(req,res,next){
        req.destination = 'establishmentsreviews';
        next();
    }
    static setServiceDestination(req,res,next){
        req.destination = 'services';
        next();
    }
    static setVendorDestination(req,res,next){
        req.destination = 'vendors';
        next();
    }
    static setBannerDestination(req,res,next){
        req.destination = 'banners';
        next();
    }

    static checkValidationError(req,res,next){
        
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            throw new Error(errors.array()[0].msg);
            
        }
        next()
        
    }

    static async authenticate(req,res,next){
        const authHeader = req.headers.authorization;
        const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

        if (!token) {
            req.errorStatus = 401;
            return next(new Error('Missing Authorization token'));
        }

        try{
            const decoded = await jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        }catch(err){
            req.errorStatus = 401;
            next(new Error('Invalid or expired token'));
        }
        
    }

    static requireRole(roles = []){
        const allowed = Array.isArray(roles) ? roles : [roles];
        return (req, res, next) => {
            const role = req.user?.role;
            if (!role || (allowed.length > 0 && !allowed.includes(role))) {
                req.errorStatus = 403;
                return next(new Error('Forbidden'));
            }
            next();
        };
    }

    static generateCode(){
        return Math.floor(100000 + Math.random() * 900000).toString()
    }

    static async unlinkImage(image,folder = 'establishments'){
        try {
            const __filename = fileURLToPath(import.meta.url);
            const __dirname = path.dirname(__filename);

            
            const publicFolderPath = path.resolve(__dirname, '../../public');
            
            const imageNameWithoutExt = path.parse(image).name;

            const originalImagePath = path.join(publicFolderPath, `uploads/${folder}/`, image);
            const imagePath = path.join(publicFolderPath, `uploads/${folder}/`, imageNameWithoutExt + '.webp');
            const thumbImagePath = path.join(publicFolderPath, `uploads/${folder}/`, 'thumb_' + imageNameWithoutExt + '.webp');

            const deleteFile = async (filePath) => {
                try {
                    if (fs.existsSync(filePath)) {
                        await fs.promises.unlink(filePath);
                        console.log(`Deleted: ${filePath}`);
                        return; // Successfully deleted
                    } else {
                        console.warn(`File does not exist: ${filePath}`);
                        return;
                    }
                    
                } catch (error) {
                    console.error(`Error deleting file: ${filePath}`, error);
                }
            };

            // Delete files asynchronously
            await Promise.all([
                deleteFile(originalImagePath),
                deleteFile(imagePath),
                deleteFile(thumbImagePath)
            ]);
        } catch (error) {
            console.error("Error in unlinkImage function:", error);
        }
    }
}

export default GlobalMiddleware;