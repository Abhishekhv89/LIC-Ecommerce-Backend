const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        // unique:true,
        // require:true
    },
    email:{
        type:String,
        // require:true
    },
    password:String,
    address:String,
    phone:Number
})


const UserModel = mongoose.model("User",UserSchema);

module.exports = UserModel;