const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const authRouter =require("./routes/authRoutes");
const productRouter =require("./routes/productRoutes");
const cookieParser = require('cookie-parser'); 
const PORT = 3001
const app = express();
const {productModel}= require('./models/ProductSchema');
const ProductModel = require('./models/ProductSchema');


//midleware
app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({extended:false}))

//database
mongoose.connect("mongodb://127.0.0.1:27017/lic-ecommerce")
.then(()=>{
    console.log("connected to Database successfully")
})
.catch(err => console.log(err));

// const f = async()=>{
//     const user = await ProductModel.create({slno:'1',
//   name:'abh',
//   brand:'arrow',
//   category: 'tshirt',
//   size: '34',
//   quantity:'83',
//   price: '897',
//   seller: 'mskd',
//   img: 'jsnx',});

// }

// f();




//routing
app.use('/',authRouter);
app.use('/product',productRouter);





app.listen(PORT,()=>{
    console.log(`server is listening at port : ${PORT}`);
})

