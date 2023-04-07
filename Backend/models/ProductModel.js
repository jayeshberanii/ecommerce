const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
title:{
    type:String,
    required:true,
    unique:true
},
description:{
    type:String,
    required:true,
},
img:{
    type:String,
    require:true
},
categories:{
    type:Array,
    required:true
},
size:{
    type:String,
},
color:{
    type:String,
},
price:{
    type:Number,
    required:true
},
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Users"
}
},{timestamps:true})


const Product= mongoose.model('Products',productSchema)
module.exports=Product