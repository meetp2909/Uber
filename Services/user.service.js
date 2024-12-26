const userModel = require("../models/user")


module.exports.createuser = async({
    firstname, lastname, email,password
}) => {
    if(!firstname ||!lastname || !email || !password){
        throw new Error('All field is required!')
    }

    const user = userModel.create({
        fullname:{
        firstname,  
        lastname,    
        },
        email,  
        password
    })

    return user;
}