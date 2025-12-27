//login and registor page business logic 

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//register logic

const register = async (req, res)=>{
    try{
      
        const {email,name, password , confirmpass}= req.body;

        ///validate
        if(!email || !name || !password || !confirmpass ){
            return res.status(400).json({message:"please fill all details"});
        }

        ////validate password 
        if (password !== confirmpass) {
            return res.status(400).json({
            success: false,
           message: "Password and confirm password do not match"
              });
           }

        const hashpassword = await  bcrypt.hash(password,10);  

        ///
        const existinguser = await User.findOne({email});

        if(existinguser){
            return res.status(400).json({
                success:false,
                message:"this email is already used ..try another ",
            })
        }

        // store user detail  in database 
         
        const user = await User.create({
            name:name,
            email:email,
            password:hashpassword,
        })

        return res.status(201).json({
            success:true,
            message:"successfully registered ",
            user:{
                userId:user._id,
                name:user.name,
                email:user.email,

            }
        })
        

        



    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Internal Server error ",
            error:err.message,
        
        })

    }
}

const login = async (req,res)=>{

    try{

        const {email,password}= req.body;

        //validate
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"fillout all details",

            })
        }

        const user = await User.findOne({email});
        if(!user){
           return res.status(400).json({
            success:false,
            message:"please fill correct info",
           }) 
        }


        const ismatch= await bcrypt.compare(password,user.password);
        if(!ismatch){
            return res.status(400).json({
                success:false,
                message:"enter correct password",
            })
        }

        const token = await jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:"3d"},
        );

        return res.status(200).json({
            success:true,
            message:"user login successfully",
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
            }

        })



    }
    catch(err){
     return res.status(500).json({
        success:false,
        message:"internal server error",
     })

    }
}

module.exports= {register,login};