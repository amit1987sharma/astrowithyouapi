import { body, param } from "express-validator";
import User from "../Model/User.js";
import { Op } from "sequelize";
class UserValidator{
    static step1(){
        return [
            body('first_name','First name is required').isString().notEmpty(),
            body('last_name','Last name is required').isString().notEmpty(),
            body('email','Email is required').isString().isEmail().withMessage('Valid Email is required').notEmpty().custom(async(email,{req})=>{
                try{
                    const user = await User.findOne({where:{email}});
                    if(user){
                         throw new Error('This email already exist in our record');   
                    }
                    return true
                }catch(err){
                    throw new Error(err.message);
                }
            }),
            body('mobile','Mobile number is required').notEmpty(),
            body('password','Password is required').notEmpty(),
        ]
    }
    static step2(){
        return [
            param('id').custom(async(user_id,{req})=>{
                try{
                    const user = await User.findOne({where:{id:user_id}});
                    if(!user){
                        throw new Error('User not found');
                    }
                    req.user = user;
                    true;
                }catch(err){
                    throw new Error(err.message);
                }
            }),
            body('dob','DOB is required').notEmpty(),
            body('gender','Gender is required').notEmpty(),
            body('city','City is required').isString().notEmpty(),
            body('state','State is required').isString().notEmpty(),
            body('country','Country is required').isString().notEmpty(),
            body('pincode','Pincode is required').isString().notEmpty(),
        ]
    }
    static step3(){
        return [
            param('id').custom(async(user_id,{req})=>{
                try{
                    const user = await User.findOne({where:{id:user_id}});
                    if(!user){
                        throw new Error('User not found');
                    }
                    req.user = user;
                    true;
                }catch(err){
                    throw new Error(err.message);
                }
            }),
            body("images").custom((value, { req }) => {
                try {
                    if (!req.files || req.files.length === 0) {
                        throw new Error("At least one image is required");
                    }
                    return true;
                } catch (err) {
                    throw new Error(err.message);
                }
            }),
        ]
    }
    static add(){
        return [
            body('first_name','First name is required').isString().notEmpty(),
            body('last_name','Last name is required').isString().notEmpty(),
            body('email','Email is required').isString().isEmail().withMessage('Valid Email is required').notEmpty().custom(async(email,{req})=>{
                try{
                    const whereCondition = { email };
                    if (req.body.id) {
                        whereCondition.id = { [Op.ne]: req.body.id }; // Exclude current user when editing
                    }
                    const user = await User.findOne({where:whereCondition});
                    if(user){
                         throw new Error('This email already exist in our record');   
                    }
                    return true
                }catch(err){
                    throw new Error(err.message);
                }
            }),
            body('mobile','Mobile number is required').notEmpty(),
            body('password','Password is required').if(body('id').not().exists()).notEmpty(),
            body('dob','DOB is required').notEmpty(),
            body('gender','Gender is required').notEmpty(),
            body('city','City is required').isString().notEmpty(),
            body('state','State is required').isString().notEmpty(),
            body('country','Country is required').isString().notEmpty(),
            body('pincode','Pincode is required').isString().notEmpty(),
        ]
    }
    static login(){
        return [
           body('email','Email is required').isString().isEmail().withMessage('Valid Email is required').notEmpty().custom(async(email,{req})=>{
                try{
                    const user = await User.findOne({where:{email}});
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
    static loginWithMobile(){
        return [
           body('mobile','Mobile is required').isString().notEmpty().custom(async(mobile,{req})=>{
                try{
                    const user = await User.findOne({where:{mobile}});
                    if(!user){
                         throw new Error('User not exist with this mobile no. in our record');   
                    }
                    return true
                }catch(err){
                    throw new Error(err.message);
                }
            })
            
        ]
    }
    static signup(){
        return [
           body('mobile','Mobile is required').isString().notEmpty().custom(async(mobile,{req})=>{
                try{
                    const user = await User.findOne({where:{mobile}});
                    if(user){
                         throw new Error('User already exist.');   
                    }
                    return true
                }catch(err){
                    throw new Error(err.message);
                }
            })
            
        ]
    }
    static loginWithMobile(){
        return [
           body('mobile','Mobile is required').isString().notEmpty().custom(async(mobile,{req})=>{
                try{
                    const user = await User.findOne({where:{mobile}});
                    if(!user){
                         throw new Error('User not exist with this mobile no. in our record');   
                    }
                    return true
                }catch(err){
                    throw new Error(err.message);
                }
            })
            
        ]
    }
    static loginWithSocial(){
        return [
           body('email','Email is required').isString().isEmail().withMessage('Valid Email is required').notEmpty().custom(async(email,{req})=>{
                try{
                    const user = await User.findOne({where:{email}});
                    if(!user){
                         throw new Error('User not exist with this email ID in our record');   
                    }
                    return true
                }catch(err){
                    throw new Error(err.message);
                }
            })
            
        ]
    }
    static update(){
        return [
            param('id').custom(async(user_id,{req})=>{
                try{
                    const user = await User.findOne({where:{id:user_id}});
                    if(!user){
                        throw new Error('User not found');
                    }
                    req.user = user;
                    true;
                }catch(err){
                    throw new Error(err.message);
                }
            }),
            body('first_name','First name is required').isString().notEmpty(),
            body('last_name','Last name is required').isString().notEmpty(),
            body('email','Email is required').isString().isEmail().withMessage('Valid Email is required').notEmpty().custom(async(email,{req})=>{
                try{
                    const user = await User.findOne({where:{email,id: { [Op.ne]: req.params.id }}});
                    if(user){
                         throw new Error('This email already exist in our record');   
                    }
                    return true
                }catch(err){
                    throw new Error(err.message);
                }
            }),
            body('mobile','Mobile number is required').notEmpty(),
            body('dob','DOB is required').notEmpty(),
            body('gender','Gender is required').notEmpty(),
            body('city','City is required').isString().notEmpty(),
            body('state','State is required').isString().notEmpty(),
            body('country','Country is required').isString().notEmpty(),
            body('pincode','Pincode is required').isString().notEmpty(),

        ]
    }
    static forgotPassword(){
        return [
            body('email','Email is required').isString().isEmail().custom(async (email,{req})=>{
                try{
                    const user = await User.findOne({where:{email}});
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
                    const user = await User.findOne({where:{email}});
                    
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
                    const user = await User.findOne({where:{email}});
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

    static updateStatus(){
        return [
            body('id','User ID is required').notEmpty().custom(async(id,{req})=>{
                try{
                    const user = await User.findByPk(id);
                    if(!user){
                        throw new Error('User not found')
                    }
                    req.user = user
                    return true
                }catch(err){
                    throw new Error(err.message);
                }
            }),
            body('status').not().isEmpty().withMessage('Status is required'),
        ]
    }
    
    static checkUser(){
        return [
            param('user_id').custom(async(user_id,{req})=>{
                try{
                    const user = await User.findByPk(user_id);
                    if(!user){
                        throw new Error('User not found')
                    }
                    req.user = user
                    return true
                }catch(err){
                    throw new Error(err.message);
                }
            }),
            
        ]
    }
}

export default UserValidator;