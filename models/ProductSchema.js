const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    slno:{
        type:Number,
        require:true
    },
    name:{
        type:String,
        require:true
    },
    brand:{
        type:String,
        require:true
    },
   category:{
        type:String,
        require:true,
    },
    size:{
        type:Number,
        require:true,
    },
    quantity:{
        type:Number,
        require:true,
    },
    price:{
        type:Number,
        require:true,
    },
    seller:{
        type:String,
        require:true,
    },
    image:{
        type:String,
        require:true,
    }
    
})




const ProductModel = mongoose.model("Product",ProductSchema);

module.exports = ProductModel;