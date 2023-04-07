const JWT=require('jsonwebtoken')
const User = require('../models/UserModel')

const Authorize=(req,res,next)=>{
    const token=req.headers.authorization
    if(!token){
        res.status(401).json({msg:"not authorize👎"})
    }else{
        const decoded=JWT.verify(token,process.env.SECRET_ACCESS_TOKEN)
        req.user=decoded.user
        next()
    }    
}
const AdminAuthorize=async(req,res,next)=>{
    const token=req.headers.authorization
    if(!token){
        res.status(401).json({msg:"not authorize👎"})
    }else{
        const decoded=await JWT.verify(token,process.env.SECRET_ACCESS_TOKEN)
        const user=await User.findById(decoded.user)
        if(!user.isAdmin){
            res.status(401).json({msg:"not authorize👎"})
        }else{
            req.user=decoded.user
            next()
        }
    }    
}

module.exports={
    Authorize,
    AdminAuthorize
}