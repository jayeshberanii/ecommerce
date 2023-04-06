const mongoose=require('mongoose')

const orderSchema=new mongoose.Schema({
userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Users',
    required:true
},
products:[
    {
        productId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Products',
            required:true
        },
        quantity:{
            type:Number,
            default:1
        }
    }
],
amount:{
    type:Number,
    required:true
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