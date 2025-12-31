const Study = require("../models/Study");

const dashboard =  async(req, res)=>{
    try{
        const userId = req.user._id;

        const total = await Study.countDocuments({user:userId});

        const pending = await Study.countDocuments({user:userId,status:"pending"});

        const completed= total-pending;

       return res.status(200).json({
       success: true,
       message: "Dashboard data fetched successfully",
       stats: {
        total,
        pending,
         completed,
        },
        });


    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"internal server error",
            error:err.message,
        })

    }
}
module.exports= {dashboard};