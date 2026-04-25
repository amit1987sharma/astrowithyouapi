import { body, param } from "express-validator";
import BackendUser from "../Model/BackendUser.js";
import { Op } from "sequelize";
class BackendUserValidator{
    static register(){
        return [
            body('name','Name is required').isString().notEmpty(),
            body('email','Email is required').isString().isEmail().withMessage('Valid Email is required').notEmpty().custom(async(email,{req})=>{
                try{
                    const whereCondition = { email };
                    if (req.body.id) {
                        whereCondition.id = { [Op.ne]: req.body.id }; // Exclude current user when editing
                    }
                    const user = await BackendUser.findOne({where:whereCondition});
                    if(user){
                         throw new Error('This email already exist in our record');   
                    }
                    return true
                }catch(err){
                    throw new Error(err.message);
                }
            }),
            body('mobile','Mobile number is required').notEmpty(),
            body('password')
            .if(body('id').not().exists()) // Only required when `id` does not exist (creation mode)
            .notEmpty().withMessage('Password is required'),
            body('business_name','Business name is required').notEmpty()
            
        ]
    }
    static login(){
        return [
           body('email','Email is required').isString().isEmail().withMessage('Valid Email is required').notEmpty().custom(async(email,{req})=>{
                try{
                    const user = await BackendUser.findOne({where:{email}});
                    if(!user){
                         throw new Error('User not exist in our record');   
                    }
                    return true
                }catch(err){
                    throw new Error(err.message);
                }
            }),
            body('password','Password is required').notEmpty(),
        ]
    }
    static updateStatus(){
        return [
            body('id','Vendor ID is required').notEmpty().custom(async(id,{req})=>{
                try{
                    const vendor = await BackendUser.findByPk(id);
                    if(!vendor){
                        throw new Error('Establishment not found')
                    }
                    req.vendor = vendor
                    return true
                }catch(err){
                    throw new Error(err.message);
                }
            }),
            body('status').not().isEmpty().withMessage('Status is required'),
        ]
    }
    static updateProfile(){
        return [
            body('name','Name is required').isString().notEmpty(),
            body('email','Email is required').isString().isEmail().withMessage('Valid Email is required').notEmpty().custom(async(email,{req})=>{
                try{
                    const whereCondition = { email };
                    if (req.user.user_id) {
                        whereCondition.id = { [Op.ne]: req.user.user_id }; // Exclude current user when editing
                    }
                    const user = await BackendUser.findOne({where:whereCondition});
                    if(user){
                         throw new Error('This email already exist in our record');   
                    }
                    return true
                }catch(err){
                    throw new Error(err.message);
                }
            }),
            body('mobile','Mobile number is required').notEmpty(),
            body('business_name','Business name is required').notEmpty()
            
        ]
    }
    static forgotPassword(){
        return [
            body('email','Email is required').isString().isEmail().custom(async (email,{req})=>{
                try{
                    const user = await BackendUser.findOne({where:{email}});
                    if(!user){
                        throw new Error('User not found');
                    }
                    req.user = user;
                    return true;
                }catch(err){
                    throw new Error(err.message);
                }
            })
        ]
    }
    static verifyResetPassword(){
        return [
            body('email','Email is required').isString().isEmail().custom(async(email,{req})=>{
                try{
                    const user = await BackendUser.findOne({where:{email}});
                    
                    if(!user){
                        throw new Error('User not found');
                    }
                    req.user = user;
                    return true;
                }catch(err){
                    throw new Error(err.message);
                }
            }),
            body('code','Verification Code is required').notEmpty()
        ]
    }
    static resetPassword(){
        return [
            body('email','Email is required').isString().notEmpty().isEmail().custom(async(email,{req})=>{
                try{
                    const user = await BackendUser.findOne({where:{email}});
                    if(!user){
                        throw new Error('User not found');
                    }
                    req.user = user;
                    return true;
                }catch(err){
                    throw new Error(err.message);
                }
            }),
            body('newpassword', 'New password is required').notEmpty(),
            body('confirm_password', 'Confirm password is required').notEmpty(),
            body('confirm_password', 'Passwords do not match').custom((value, { req }) => {
                if (value !== req.body.newpassword) {
                    throw new Error('Passwords do not match');
                }
                return true;
            })
        ]
    }
    
}
export default BackendUserValidator;