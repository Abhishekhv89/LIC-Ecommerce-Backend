const express = require('express')
const router = express.Router()
const cors = require("cors");
const {uploadProducts,isUploaded, getProducts} = require('../controllers/productControllers')

const requireAuth = require('../middleware/requireAuth');



router.use(cors({
    credentials:true,
    origin:'http://localhost:3000'
}));
// router.use(requireAuth)


router.post('/upload',uploadProducts);
router.get('/isUploaded',isUploaded);
router.get('/getProducts',getProducts);

module.exports = router