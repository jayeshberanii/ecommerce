const JWT=require('jsonwebtoken')

const generateAccessToken=(user)=>{
    const token =JWT.sign({user},process.env.SECRET_ACCESS_TOKEN,{
        expiresIn:'15m'
    })
    return token;
}
const generateRefreshToken=(user)=>{
    const token =JWT.sign({user},process.env.SECRET_ACCESS_TOKEN,{
        expiresIn:'1d'
    })
    return token;
}
module.exports={
    generateAccessToken,
    generateRefreshToken,
}