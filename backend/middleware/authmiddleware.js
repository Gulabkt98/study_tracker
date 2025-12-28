const User = require("../models/User");
const jwt =  require("jsonwebtoken");


const authmiddleware = async(req,res, next)=>{
    try{
         

        const token = req.cookies?.token||
                      req.body?.token || 
                      req.header("Authorization")?.replace("Bearer ", "");
         
        if(!token ){
            return res.status(401).json({
                success:false,
                message:"token is not found / missing",
            })
        }         
        
        //decode the token

        const  decode =  jwt.verify(token , process.env.JWT_SECRET);

        const user = await User.findById(decode.id).select("-password");
   
        if(!user){
            return res.status(401).json({
                success:false,
                message:"user does not exist "

            })
        }

        req.user=user;

        next();

    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"internal server error",
        })

    }
}
module.exports ={authmiddleware};
