import { body, param } from "express-validator";
import Establishment from "../Model/Establishment.js";
import User from "../Model/User.js";
class EstablishmentReviewValidator{
    static create(){
        return [
            body('establishment_id','Establishment ID is required').notEmpty().custom(async(establishment_id,{req})=>{
                try{
                    const establisment = await Establishment.findByPk(establishment_id);
                    if(!establisment){
                        return new Error('Establishment not found');
                    }
                    return true
                }catch(err){
                    throw new Error(err.message);
                }
            }),
            // param('user_id','User ID is required').notEmpty().custom(async(user_id,{req})=>{
            //     try{
            //         const user = await User.findById(user_id);
            //         if(!user){
            //             return new Error('User not found');
            //         }
            //         return true
            //     }catch(err){
            //         throw new Error();
            //     }
            // }),
            body("rating").isInt().withMessage("Rating must be an integer"),
            body("comment").not().isEmpty().withMessage("Review is required"),
        ]
    }
}
export default EstablishmentReviewValidator