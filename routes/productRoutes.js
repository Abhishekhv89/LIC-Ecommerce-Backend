const express = require('express')
const router = express.Router()
const cors = require("cors");
const {uploadProducts,isUploaded, getProducts,viewProduct} = require('../controllers/productControllers');


const {isAuthenticate,authorizeRoles}= require('../middleware/requireAuth');
const roles = require('../constants');



router.use(cors({
    credentials:true,
    origin:'http://localhost:3000'
}));
// router.use(requireAuth)


router.post('/upload',isAuthenticate,authorizeRoles(roles.admin),uploadProducts);
router.get('/isUploaded',isAuthenticate,isUploaded);
router.get('/getProducts',isAuthenticate,getProducts);
router.get('/:id',isAuthenticate,viewProduct);

module.exports = router