const User=require('../models/User');
const jwt=require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const signup=async(req,res,next)=>{
    try{
        const {fullName,email,password,confirmPassword}=req.body;

        if(password!=confirmPassword){
            return res.status(400).json({
                success:false,
                message:'password do not match'
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser=await User.create({
            fullName,
            email,
            password:hashedPassword
        });

        const token=jwt.sign(
            {id:newUser._id},
             process.env.JWT_SECRET,
            {expiresIn:process.env.JWT_EXPIRE}
        );
        res.status(201).json({
           success:true,
           token,newUser})

    }
    catch(e){
        res.status(400).json({
            success:false,
            message:e.message
        })
    }
}

const login=async(req,res,next)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:'Please provide email and password'
            });
        }
        const seeUser = await User.findOne({ email });
        if (!seeUser) {
            return res.status(401).json({
                success: false,
                message: "Incorrect email or password"
            });
        }
        
        const checkPassword = await bcrypt.compare(password, seeUser.password);

        if (!checkPassword) {
            return res.status(401).json({
                success: false,
                message: "Incorrect email or password"
            });
        }
        const token=jwt.sign(
            {id:seeUser._id},
             process.env.JWT_SECRET,
            {expiresIn:process.env.JWT_EXPIRE}
        );

        res.status(200).json({
            success:true,
            token,
            seeUser: { id: seeUser._id, email: seeUser.email, fullName: seeUser.fullName }
        });

    }
    catch (err) {
    res.status(400).json({
      success:false,
      message: err.message
    });
}
}



module.exports={signup,login};