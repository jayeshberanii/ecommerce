const Cart = require("../models/CartModel")
const Order = require("../models/OrderModel")

//Place Order
const placeOrder=async(req,res)=>{
    try {
        const{address}=req.body
        const cart=await Cart.findOne({user:req.user}).populate("user", "username email").populate("products.product", "title img size color price")
        if(!cart){
            res.status(404).json({msg:"cart not found!"})
        }else{
            const order=await Order.create({
                user:req.user,
                products:cart.products,
                // amount:{$sum:{$multiply:["cart.products.price","cart.products.quantity"]}}
                address:address
            })
            res.status(200).json(order)
        }
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

// Cancel Order
const cancelOrder=async(req,res)=>{
    try {
        const order=await Order.findById(req.body.orderId)
        if(order){
            if(order.status!=="received"){
                order.status="cancelled"
                await order.save()
                res.status(200).json({msg:"cancelled updated",order:order})
            }else{
                res.status(400).json({msg:"order already received"})
            }            
        }else{
            res.status(404).json({msg:"order not found"})
        }
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

//receive order
const receiveOrder=async(req,res)=>{
    try {
        const order=await Order.findById(req.body.orderId)
        if(order){
            if(order.status!=="cancelled"){
                order.status="received"
                await order.save()
                res.status(200).json({msg:"received updated",order:order})
            }else{
                res.status(400).json({msg:"order already cancelled"})
            }            
        }else{
            res.status(404).json({msg:"order not found"})
        }
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

//get order
const getOrder=async(req,res)=>{
    try {
        const order=await Order.find({user:req.user})
        if(order){
            res.status(200).json(order)
        }else{
            res.status(404).json({msg:"order not found"})
        }
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

//get All order
const getAllOrders=async(req,res)=>{
    try {
        const orders=await Order.find()
        if(orders){
            res.status(200).json(orders)
        }else{
            res.status(404).json({msg:"order not found"})
        }
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

module.exports={
    placeOrder,
    cancelOrder,
    receiveOrder,
    getOrder,
    getAllOrders
}