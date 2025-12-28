const User= require("../models/User");
const Study = require("../models/Study");

const createStudy = async (req, res)=>{
    try{
       const {title ,description , subject ,status } = req.body;

       if(!title || !subject ){
        return res.status(401).json({
            success:false,
            message:"please fill required detail",
        })

       }

       //creste study 
       const study = await Study.create({
        title,
        description,
        subject,
        status,
        user:req.user._id,
       })

       return res.status(200).json({
        success:true,
        message:"your study task created",
        study,
       })

       

    }
    catch(err){

        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
            error : err.message,

        })

    }
}
 
module.exports = { createStudy };