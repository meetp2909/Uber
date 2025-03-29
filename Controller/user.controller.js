const mongoose = require('mongoose');
const userModel = require('../models/user')
const {validationResult} = require('express-validator');
const userservice = require('../Services/user.service');
const authmiddleware = require("../Middleware/auth.middleware")
const blacklistToken = require("../models/blacklistToken")
module.exports.registeruser = async(req, res) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})

    }


    console.log(req.body);
    const {fullname, email ,password} = req.body

    const hashedpassword = await userModel.hashPassword(password);

    const user = await userservice.createuser(
        {
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedpassword
        }
    );

    const userInstance = new userModel(user);
    const token = userInstance.generateAuthToken();

    res.status(201).json({ token, user });
};

//     const token =  userModel.generateAuthToken()
//     res.status(201).json({token, user})
// } 


module.exports.userlogin = async(req, res) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
   }

   const {email, password } = req.body;
   const user = await userModel.findOne({ email}).select('+password');

   if(!user){
    return res.status(401).json({message: 'Invalid email or password'})


   }


   const matchpassword = await user.comparePassword(password)

   if(!matchpassword){
    return res.status(401).json({message: 'Invalid email or password'})
   }

   const token = user.generateAuthToken();
   return res.status(200).json({token, user});
}

module.exports.userprofile = async (req,res) =>{
    return res.status(201).json(req.user);
}

// module.exports.userlogout = async(req,res) =>{
//     res.clearCookie('token');
//     const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
//     await blacklistToken.create({token})

//     return res.status(201).json({message:"User-logout succesfully"})
// }\

module.exports.userlogout = async (req, res) => {
    try {
        const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(400).json({ message: "No token found" });
        }

        // Check if the token is already blacklisted
        const existingToken = await blacklistToken.findOne({ token });

        if (!existingToken) {
            await blacklistToken.create({ token });
        }

        res.clearCookie("token");
        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        return res.status(500).json({ message: "Error logging out", error: error.message });
    }
};
