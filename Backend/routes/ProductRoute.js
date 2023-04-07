const { getAllProducts, createProduct, getProduct, updateProduct, deleteProduct } = require('../controller/ProductController')
const { AdminAuthorize } = require('../utils/Authorize')

const route = require('express').Router()

route.get('/', getAllProducts) //Get all products
route.post('/create', AdminAuthorize, createProduct) //create product
route.get('/:id', getProduct) //get product
route.put('/:id', AdminAuthorize, updateProduct) //update product
route.delete('/:id', AdminAuthorize, deleteProduct) //delete product

module.exports = route