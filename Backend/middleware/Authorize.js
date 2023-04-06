const JWT=require('jsonwebtoken')

const Authorize=(req,res,next)=>{
    const token=req.headers.Authorize
    !token && res.status(401).json({error:"not Authorize"})
    next()
}