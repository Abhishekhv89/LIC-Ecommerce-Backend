const ProductModel =require('../models/ProductSchema');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const validator = require('validator')
// const  {creatUserValidation , customMessages} = require('../helpers/validation_Shema')
// const {user_req,user_taken,pass_req,email_req,email_not_valid,email_taken,ph_req,ph_taken,inCrt_pass,ser_err} = require('../constants')

const uploadProducts = async(req,res)=>{
    try{
        
         const data = req.body;
         console.log(data);

   
   const user = await ProductModel.create({...data});
   if(!user){
     return res.json({
        error:"error occured while uploading file..."
    })
   }else{
    return res.json(user)
   }
    


    }catch(error){
      console.log(error)
        return res.json({
        error:"error occured while uploading file..."
    })
    }
   
}

const isUploaded = async(req,res)=>{
    try{
     const product = await ProductModel.findOne({});
    if(product){
       return res.json(true)
    }else{
        return res.json(false)
    }

    }catch(e){
        console.log(e);
    }
    
}

const getProducts = async (req, res) => {
   try {
    const { page = 1, limit = 9, brands = '',sellers='', minPrice = 0, maxPrice = 5000 } = req.query;
    let brandArray = brands.split(',');
    let sellerArray = sellers.split(',');

    console.log(page,limit,brandArray)
    brandArray = brandArray.map(str => str.toUpperCase());
    // sellerArray = sellerArray.map(str => str.toUpperCase());
    console.log(page,limit,sellerArray);
    const query = {
      price: { $gte: Number(minPrice), $lte: Number(maxPrice) },
      ...(brandArray.length > 0 && brandArray[0] !== '' ? { brand: { $in: brandArray } } : {}),
      ...(sellerArray.length > 0 && sellerArray[0] !== '' ? { seller: { $in: sellerArray } } : {})
    };

    const products = await ProductModel.find(query)
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));
      console.log("\n new query:   \n" ,products);
      console.log("\n count :   \n" ,products.length)

    res.json(products);
  }  catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Internal server error' });
  }
};



module.exports = {uploadProducts,isUploaded,getProducts}