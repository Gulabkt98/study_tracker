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

const getstudies = async(req,res)=>{
    try{
         
        const userId =  req.user._id;
        const studies = await Study.find({ user: req.user._id });
        console.log("CREATE USER:", req.user._id.toString());


         
        return res.status(200).json({
            success:true,
            message:"all studies data feteched successfully",
            count:studies.length,
            studies,
        })
        


    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"internal server error",
            error:err.message,
        })

    }
}
 
module.exports = { createStudy,getstudies };