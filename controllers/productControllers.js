const FilterModel = require('../models/FiltersSchema');
const ProductModel =require('../models/ProductSchema');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const validator = require('validator')
// const  {creatUserValidation , customMessages} = require('../helpers/validation_Shema')
// const {user_req,user_taken,pass_req,email_req,email_not_valid,email_taken,ph_req,ph_taken,inCrt_pass,ser_err} = require('../constants')

const uploadProducts = async(req,res)=>{
    try{
        
          // console.log(req.body);
        //  req.body.user = req.user.id;
            const userID=req.user.id;
        //  console.log(req.body);
        const  products = req.body

        let err =null;

         for(const product of products){
          let prdt=null;
          const func =async()=>{
            try{
              prdt = await ProductModel.create({...product,user:userID});
              // console.log(prdt);
              const brandExist = await FilterModel.findOne({title:product.brand})
              if(!brandExist){
                await FilterModel.create({title:product.brand,group:"Brand"});
              }
              const sellerExist = await FilterModel.findOne({title:product.seller})
              if(!sellerExist){
                await FilterModel.create({title:product.seller,group:"Seller"});
              }


              // const filter = await FilterModel.cr
            }catch(error){
              console.log("error : ",error);
            }
           
          }
         await func();
          // console.log(prdt);
           if(!prdt){
            err = `error occured while uploading  product ={name :${product.name} , slno : ${product.slno}}  `;
            break;
          }
         }

         if(!err){
          return res.json({success:true});
         }
         else{
          return res.json({
                error:err
            })
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
        return res.json(false)
    }
    
}

const getProducts = async (req, res) => {
   try {

    const { page = 1, limit = 9, brands = '',sellers='', minPrice = 0, maxPrice = 5000 } = req.query;
    let brandArray = brands.split(',');
    let sellerArray = sellers.split(',');

    // console.log(page,limit,brandArray)
    brandArray = brandArray.map(str => str.toUpperCase());
    // sellerArray = sellerArray.map(str => str.toUpperCase());
    // console.log(page,limit,sellerArray);
    const query = {
      price: { $gte: Number(minPrice), $lte: Number(maxPrice) },
      ...(brandArray.length > 0 && brandArray[0] !== '' ? { brand: { $in: brandArray } } : {}),
      ...(sellerArray.length > 0 && sellerArray[0] !== '' ? { seller: { $in: sellerArray } } : {})
    };

    const products = await ProductModel.find(query)
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));
      // console.log("\n new query:   \n" ,products);
      // console.log("\n count :   \n" ,products.length)

    res.json(products);
  }  catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Internal server error' });
  }
};

const viewProduct = async(req,res)=>{
  try{
     const {id} = req.params;
  const query = {_id:id};
  const product = await ProductModel.findOne(query);
  if(product){
    return res.json({product:product});
  }else{
        return res.json({error:"product not found"});
  }

  }catch(e){
    console.log(e);
    return res.json({error:"product not found"});
  }
 
}



module.exports = {uploadProducts,isUploaded,getProducts,viewProduct}