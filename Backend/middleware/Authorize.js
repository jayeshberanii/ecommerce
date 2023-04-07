const JWT=require('jsonwebtoken')

const Authorize=(req,res,next)=>{
    const token=req.headers.Authorize
    !token && res.status(401).json({error:"not Authorize"})
    const decoded=JWT.verify(token,process.env.SECRET_ACCESS_TOKEN)
    req.user=decoded
    next()
}