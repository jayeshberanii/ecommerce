const JWT=require('jsonwebtoken')

const Authorize=(req,res,next)=>{
    const token=req.headers.authorization
    if(!token){
        res.status(401).json({msg:"not authorize👎"})
    }else{
        const decoded=JWT.verify(token,process.env.SECRET_ACCESS_TOKEN)
        console.log(decoded);
        next()
    }    
}

module.exports=Authorize