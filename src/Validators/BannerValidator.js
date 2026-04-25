import { body, param } from "express-validator";
class BannerValidator{
    static create(){
        return [
            body("name").not().isEmpty().withMessage("Name is required"),
            body("description").not().isEmpty().withMessage("Description is required"),
        ]
    }
    static updateStatus(){
        return [
            body('id','Establishment ID is required').notEmpty().custom(async(id,{req})=>{
                try{
                    const establisment = await Establishment.findByPk(id);
                    if(!establisment){
                        throw new Error('Establishment not found')
                    }
                    req.establishment = establisment
                    return true
                }catch(err){
                    throw new Error(err.message);
                }
            }),
            body('status').not().isEmpty().withMessage('Status is required'),
        ]
    }

    
}

export default BannerValidator