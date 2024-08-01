const express = require('express')
const router = express.Router()
const cors = require("cors");
const {addProductToCart,getCartItems,removeItemFromCart,updateCart} = require('../controllers/cartControllers');


const {isAuthenticate,authorizeRoles}= require('../middleware/requireAuth');



router.use(cors({
    credentials:true,
    origin:'http://localhost:3000'
}));
// router.use(requireAuth)

// Route to add product to cart
router.post('/:userId/add',isAuthenticate,addProductToCart);
// Route to get cart items
router.get('/:userId',isAuthenticate,getCartItems);

// Route to remove item from cart
router.post('/:userId/remove',isAuthenticate,removeItemFromCart);
router.patch('/:userId',isAuthenticate,updateCart);


module.exports = router