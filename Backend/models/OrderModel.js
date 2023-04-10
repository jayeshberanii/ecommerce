const mongoose=require('mongoose')

const orderSchema=new mongoose.Schema({
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Users',
    required:true
},
products:{
    type:Array,
    required:true
},
amount:{
    type:Number
},
address:{
    type:Object,
    required:true
},
status:{
    type:String,
    default:"pending"
}

},{timestamps:true})


const Order= mongoose.model('Orders',orderSchema)
module.exports=Order