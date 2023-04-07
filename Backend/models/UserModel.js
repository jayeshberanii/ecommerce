const mongoose=require('mongoose')
const bcrypt=require('bcrypt')

const userSchema=new mongoose.Schema({
username:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true,
    unique:true
},
password:{
    type:String,
    required:true
},
refreshToken:{
    type: String
},
isAdmin:{
    type:Boolean,
    default:false
}
},{timestamps:true})

userSchema.pre('save',async function(next){
    const salt=await bcrypt.genSalt(Number(process.env.SALT_ROUNDS))
    this.password=await bcrypt.hash(this.password,salt)
    next()
})
userSchema.methods.comparePassword=async function(password){
    const isCompared=await bcrypt.compare(password,this.password)
    return isCompared;
}

const User= mongoose.model('Users',userSchema)
module.exports=User