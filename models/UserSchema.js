const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        require:true
    },
    email:{
        type:String,
        unique:true,
        require:true
    },
    password:{
        type:String,
        require:true,
    },
    address:String,
    phone:{
        type:Number,
        require:true,
    }
})


const UserModel = mongoose.model("User",UserSchema);

module.exports = UserModel;