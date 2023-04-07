const Product = require("../models/ProductModel")

//Get All Products
const getAllProducts=async(req,res)=>{
    try {
        const products=await Product.find()
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

//create product
const createProduct=async(req,res)=>{
    try {
        const product=await Product.create({...req.body,user:req.user})
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}
//get product
const getProduct=async(req,res)=>{
    try {
        const product=await Product.findById(req.params.id)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

//update product
const updateProduct=async(req,res)=>{
    try {
        const product=await Product.findByIdAndUpdate(req.params.id,req.body)
        if(!product){
            res.status(404).json({msg:"product not found🥲"})
        }else{
            res.status(200).json({msg:"product updated😎"})
        }
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

//delete product
const deleteProduct=async(req,res)=>{
    try {
        const product=await Product.findByIdAndDelete(req.params.id)
        if(!product){
            res.status(404).json({msg:"product not found🥲"})
        }else{
            res.status(200).json({msg:"product deleted"})
        }
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

module.exports={
    getAllProducts,
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct
}