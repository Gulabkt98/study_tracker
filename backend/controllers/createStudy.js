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

const getstudies = async (req, res) => {
  try {
    const userId = req.user._id;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    let filter = { user: userId };

    if (req.query.status) {
      filter.status = req.query.status;
    }

    if (req.query.search) {
      filter.title = {
        $regex: req.query.search,
        $options: "i",
      };
    }

    const studies = await Study.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalStudies = await Study.countDocuments(filter);

    return res.status(200).json({
      success: true,
      totalStudies,
      currentPage: page,
      totalPages: Math.ceil(totalStudies / limit),
      studiesOnPage: studies.length,
      studies,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};


const deletestudies=async(req,res)=>{

    try{
        const userId = req.user._id;
    const studyId = req.params.id;

    if(!studyId){
        return res.status(400).json({
            success:false,
            message:"Study Id is required",
        })
    }
    
    if(!userId){
        return res.status(400).json({
            success:false,
            message:"user not found",
        })
    }

    const study = await Study.findOne({
        _id : studyId,
        user:userId,
    })

     
    if(!study){
        return res.status(400).json({
            success:false,
            message:"study not found or not authrized",
        })
    }

    await Study.findByIdAndDelete(studyId);


    return res.status(200).json({
        success:true,
        message:"study delete successfully ",
    })



    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Intternal server error",
        })
    }

}

const updatestudy = async (req, res) => {
  try {
    const userId = req.user._id;
    const studyId = req.params.id;
    const { title, description, status } = req.body;

    const study = await Study.findOne({
      _id: studyId,
      user: userId,
    });

    if (!study) {
      return res.status(404).json({
        success: false,
        message: "Study not found or not authorized",
      });
    }

    // update only provided fields
    if (title) study.title = title;
    if (description) study.description = description;
    if (status) study.status = status;

    await study.save();

    return res.status(200).json({
      success: true,
      message: "Study updated successfully",
      study,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

 
module.exports = { createStudy,getstudies,deletestudies,updatestudy };