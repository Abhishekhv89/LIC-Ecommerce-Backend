
const ProductModel =require('../models/ProductSchema');
const UserModel =require('../models/UserSchema');


const addProductToCart = async(req,res)=>{

    // console.log("yes");
const { userId } = req.params;
    const { productId } = req.body;

    // try {
    //     const user = await UserModel.findById(userId);
    //     if (!user) {
    //         return res.status(404).send('User not found');
    //     }

    //     const product = await ProductModel.findById(productId);
    //     if (!product) {
    //         return res.status(404).send('Product not found');
    //     }


    //     const existingItem = user.cart.find(item => item.product._id.toString() === productId);
    //     // await existingItem.populate('cart.product');
    //     console.log("existing item: ",existingItem);

    //     if (existingItem) {
    //         const user = await UserModel.findById(userId).populate('cart.product');
    //         await user.save();
    //         return res.status(200).send(user.cart);
    //     } else {
    //         // const product = product._id;
    //         user.cart.push({ product: product, quantity: 1 });
    //         console.log(user.cart);
    //         console.log("hello")
    //     // await user.populate('cart.product').execPopulate();
    //     const user = await UserModel.findById(userId).populate('cart.product');
    //     await user.save();
    //     console.log(user.cart);
    //     return res.status(200).send(user.cart);

    //     }

        
    // } catch (error) {
    //     res.status(500).send(error.message);
    // }

    try {
    const user = await UserModel.findById(userId).populate('cart.product');
    console.log(user);
    if (!user) {
        return res.status(404).send('User not found');
    }

    const product = await ProductModel.findById(productId);
    if (!product) {
        return res.status(404).send('Product not found');
    }
    // console.log(product._id.toString(),productId);
    //   const prdtId = product._id.toString();
    //    console.log(user.cart);

    const existingItem = user.cart.find(item => item.product._id.toString() === productId);

    console.log("existing item: ", existingItem);

    if (existingItem) {
        return res.status(200).send(user.cart);
    } else {
         user.cart.push({ product: productId, quantity: 1 });

        console.log("yes");
    }

    await user.save();
    
    // Re-populate the cart products
    await user.populate('cart.product');

    console.log(user.cart);
    return res.status(200).send(user.cart);

} catch (error) {
    console.log("aad to cart error : ",error.message)
    res.status(500).send(error.message);
}

}


// Add product to cart or update quantity
const updateCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {
        const user = await UserModel.findById(userId);

        const cartItem = user.cart.find(item => item.product.toString() === productId);
        if (cartItem) {
            cartItem.quantity = quantity;
        } else {
            return 
        }

        await user.save();
        // await user.populate('cart.product').execPopulate();
        res.status(200).json({ success: true, cart: user.cart });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const getCartItems = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await UserModel.findById(userId).populate('cart.product');
        if (!user) {
            return res.status(404).send('User not found');
        }
        // console.log("the user cart :",user.cart)
        res.status(200).send(user.cart);
        
    } catch (error) {
        res.status(500).send(error.message);
    }
};



const removeItemFromCart = async (req, res) => {
    const { userId } = req.params;
    const { productId } = req.body;

    try {
        const user = await UserModel.findById(userId).populate('cart.product');
        if (!user) {
            return res.status(404).send('User not found');
        }

        user.cart = user.cart.filter(item => item.product._id.toString() !== productId);
        await user.save();

        res.status(200).send(user.cart);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {addProductToCart,getCartItems,removeItemFromCart,updateCart};

