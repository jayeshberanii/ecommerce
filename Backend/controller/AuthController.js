const JWT=require('jsonwebtoken')
const User = require('../models/UserModel')
const {generateAccessToken, generateRefreshToken} = require('../utils/GenerateToken')

// Register User
const userRegister = async (req, res) => {
    try {
        const { username, email, password } = req.body
        if (username === "" || email === "" || password === "") {
            res.status(404).json({ msg: "Some fields are empty😥" })
        } else {

            const isExists = await User.findOne({ email })
            if (isExists) {
                res.status(404).json({ msg: "Email Already Exists !!" })
            } else {
                const NewUser = await new User(req.body)
                await NewUser.save()
                const { password: pass, ...rest } = NewUser._doc
                res.status(200).json({ msg: "user registered", user: rest })
            }
        }
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

//Login User
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (email === "" || password === "") {
            res.status(404).json({ msg: "Empty email or password field😥" })
        } else {
            const user = await User.findOne({ email })
            !user && res.status(404).json({ msg: "user not found!😥" })
            if (user) {
                const isCompared = await user.comparePassword(password)
                !isCompared && res.status(404).json({ msg: "Invalid Credentials!😥" })
                if(isCompared){
                    const{password:pass,...rest}=user._doc
                    const accessToken= generateAccessToken(rest._id);
                    const refreshToken= generateRefreshToken(rest._id)
                    await User.findByIdAndUpdate(rest._id,{
                        refreshToken:refreshToken,
                    },{
                        new:true,
                    })
                    res.header('Authorization',accessToken)
                    res.cookie('token',refreshToken,{ httpOnly:true, secure:false})
                    res.status(200).json({ msg: "User login successfully 🎉",user:rest,token:accessToken})
                }                
            }
        }
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

//Handle Refresh
const handleRefresh=async(req,res,next)=>{
    try {
        const refreshToken=req.cookies.token
        if(!refreshToken){
            res.status(401).json({ msg: "token not found😥" })
        }else{
            const decoded=JWT.verify(refreshToken,process.env.SECRET_REFRESH_TOKEN)
            const user=await User.findOne({refreshToken})
            if(!user){
                res.status(401).json({ msg: "token not found😥" })
            }else{
                if(user._id.toString()!==decoded.user.toString()){
                    res.status(401).json({ msg: "Not Authorize😥" })
                }else{
                    const accessToken=generateAccessToken(user._id)
                    res.json({accessToken:accessToken})
                }
            }
        }
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

module.exports = {
    userRegister,
    userLogin,
    handleRefresh,
}