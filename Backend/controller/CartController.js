const Cart = require("../models/CartModel");

//Add to cart
const addToCart = async (req, res) => {
    try {
        const { data } = req.body;
        const cart = await Cart.findOne({ user: req.user });
        if (cart) {
            const existsCartProducts = await Cart.updateOne(
                { user: req.user, "products.product": data.product },
                {
                    $inc: { "products.$.quantity": data.quantity || 1 },
                }
            );
            if (existsCartProducts.matchedCount) {
                res
                    .status(200)
                    .json({
                        msg: "already exists product so increase to cart successfully",
                    });
            } else {
                await Cart.findByIdAndUpdate(cart._id, {
                    $push: { products: data },
                });
                res.status(200).json({ msg: "add to cart successfully" });
            }
        } else {
            const newCart = await Cart.create({
                user: req.user,
                products: [data],
            });
            res.status(200).json({ msg: "add to cart successfully", cart: newCart });
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

//Remove from Cart
const removeFromCart = async (req, res) => {
    try {
        const { data } = req.body;
        const cart = await Cart.findOne({ user: req.user });
        if (cart) {
            const isUpdate = await Cart.updateOne({ _id: cart._id, "products.product": data.product }, {
                $pull: { products: { product: data.product } },
            });
            if (isUpdate.matchedCount) {
                res.status(200).json({ msg: "remove from cart successfully" });
            } else {
                res.status(404).json({ msg: "Product not found !" });
            }

        } else {
            res.status(404).json({ msg: "cart not found!" });
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

//Clear cart
const clearCart = async (req, res) => {
    try {
        const cart = await Cart.deleteOne({ user: req.user });
        console.log(cart);
        if (cart.deletedCount) {
            res.status(200).json({ msg: "cart cleared" })
        } else {
            res.status(404).json({ msg: "cart not found!" });
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

//Get Cart
const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user }).populate("user", "username email").populate("products.product", "title img size color price")
        if (cart) {
            res.status(200).json(cart)
        } else {
            res.status(404).json({ msg: "cart not found!" });
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

module.exports = {
    addToCart,
    removeFromCart,
    clearCart,
    getCart
};
