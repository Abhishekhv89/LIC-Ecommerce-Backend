const mongoose = require('mongoose');

// const SizeSchema = new mongoose.Schema({
  
// //   ,
// //   stock: {
// //     type: Number,
// //     required: true,
// //     default: 0
// //   }
// });

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
    sizes: {
    type: [String],
     required: true,
    enum: ['US6','US10.5','US11','US11.5','US7', 'US7.5', 'US8', 'US8.5', 'US9', 'US9.5', 'US10', 'US11.5', 'US12', 'US12.5', 'US13', 'US13.5'] // Adjust sizes as needed
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
    images:{
        type:[String],
        require:true,
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
    }
    
})




const ProductModel = mongoose.model("Product",ProductSchema);

module.exports = ProductModel;