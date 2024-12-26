const mongoose = require('mongoose');
const userModel = require('../models/user')
const {validationResult} = require('express-validator');
const userservice = require('../Services/user.service')

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