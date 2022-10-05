import  Jwt  from "jsonwebtoken";
import { ErrorModel } from "../models/responseModels.js";

export default  async (req,res,next)=>{
    const bearerToken = req.headers.authorization;
    try{
        const token = bearerToken.split(' ');
        const verified = await Jwt.verify(token[1],process.env.JWTSECRATE);
        req.user = verified;
        next();
    }catch(error){
        res.send(new ErrorModel({responseCode:401,errorMessage:error.message}));
    }
    
}