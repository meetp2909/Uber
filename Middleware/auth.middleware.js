const userModel = require('../models/user')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");




module.exports.authuser = async(req, res, next) => {
    const token = await  req.cookies?.token || req.headers.authorization?.split(' ')[1];

    if(!token){
        return res.status(401).json({message: "Unauthorization"});
    }
    
    const blacklist = await userModel.findOne({token:token});
    if(blacklist)
        return res.status(401).json({message:"Please try to logout ......"})
  
    try{

        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decode._id)

        req.user = user;

       return next();
    } catch (err){
        return res.status(401).json({message: "unauthorized"})
    }
}