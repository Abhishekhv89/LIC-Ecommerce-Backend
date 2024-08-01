const mongoose = require('mongoose');

const FilterSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true,
        unique:true
    },
    group:{
        type:String,
        require:true,
        enum: ["Brand","Seller"]
    }
})




const FilterModel = mongoose.model("Filter",FilterSchema);

module.exports = FilterModel;