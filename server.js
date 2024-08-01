const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const userRouter =require("./routes/userRoutes");
const productRouter =require("./routes/productRoutes");
const cartRouter =require("./routes/cartRoutes");
const cookieParser = require('cookie-parser'); 
const PORT = 3001
const app = express();
const {productModel}= require('./models/ProductSchema');
const bodyParser = require("body-parser");
const ProductModel = require('./models/ProductSchema');
const { uploadFilter, getFilters } = require('./controllers/FilterControllers');
// const cookieParser = require('cookie-parser');
const cors = require("cors");

//midleware
app.use(express.json())
app.use(cookieParser());
// app.use(express.urlencoded({extended:false}))
app.use(bodyParser.urlencoded({ extended: true }));

//database
mongoose.connect(process.env.DB_URL)
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

app.use(cors({
    credentials:true,
    origin:'http://localhost:3000'
}));


//routing
app.get('/getFilters',getFilters);


app.use('/',userRouter);
app.use('/product',productRouter);
app.use('/cart',cartRouter);
app.post('/upoadFilter',uploadFilter);





app.listen(PORT,()=>{
    console.log(`server is listening at port : ${PORT}`);
})

