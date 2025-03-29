const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname: {
        firstname:{
            require: true,
            type:String,
            minlength:[2, 'Firstname must be of more then three letters']
        },
        lastname:{
            require: true,
            type: String,
            minlength:[2, "Lastname must be of more then 2 letter"]
        } },
        email:{
            require: true,
            unique: true,
            type: String,
            minlength:[2, "Email must be more than two letters please"]
        },
        password:{
            require:true,
            type:String,
            select:false,
            minlength:[8, "Password must be more than 8 letters and use unique character"]
        },
        socketId:{
            type: String
        }   
})

userSchema.methods.generateAuthToken =  function (){
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET,{expiresIn: '24h'})
    return token;
}

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

userSchema.statics.hashPassword = async function (password){
    return await bcrypt.hash(password, 10);
}

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;

