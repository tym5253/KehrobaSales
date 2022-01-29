import jwt from 'jsonwebtoken';
import admin from '../db/model/adminAuthSchema.js';


const Authenticate = async (req,res,next) =>{
    
    try{
        const token = req.cookies.jwtToken;
        const verifyToken = jwt.verify(token,process.env.SECRET_KEY);
        const rootUser= await admin.findOne({_id:verifyToken._id});
    
        if(!rootUser){throw new Error('User not Found!');}


        next();
    }catch(err){
        res.status(401).send("Unauthorized!");
        console.log(err);
    }
}

export default Authenticate;