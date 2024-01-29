import JWT from "jsonwebtoken"
import {user} from "../models/model.users.js"


export const isAuthenticated = async(req,res,next)=>{
    try {
        const token = req.cookies;
        
        if(token){
            return res.status(401).json({
                sucess : false,
                message : "You are login first."})
        }

        const decode = JWT.verify(token,process.env.JWT_SECRET)

        req.user = await user.findById(decode._id);
        next();

    } catch (error) {
        res,status(500),json({
            sucess : false,
            message : error.message})
        
    }
}