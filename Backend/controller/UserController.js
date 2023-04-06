const User = require("../models/UserModel");

//Get all Users
const getAllUsers=async(req,res)=>{
    try {
        const users=await User.find()
        res.status(200).json(users)
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: error.message })
    }
}

module.exports={
    getAllUsers,
}