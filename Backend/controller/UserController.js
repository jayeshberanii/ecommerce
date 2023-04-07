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

//Get User
const getUser=async(req,res)=>{
    try {
        const user=await User.findById(req.user)
        const get_user=await User.findById(req.params.id)
        if(req.user === req.params.id || (user.isAdmin && !get_user.isAdmin)){ 
            if(!get_user){
                res.status(404).json({msg:"User not found!"})
            }else{
                res.status(200).json(get_user)
            }            
        }else{
            res.status(401).json({msg:"Not authorize"})
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: error.message })
    }
}

//Delete User
const deleteUser=async(req,res)=>{
    try {
        const user=await User.findById(req.user)
        if(req.user === req.params.id || user.isAdmin){
            const response=await User.findByIdAndDelete(req.params.id)
            console.log(response);   
            res.status(200).json({msg:"user deleted 🐥"})         
        }else{
            res.status(401).json({msg:"Not authorize"})
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: error.message })
    }
}

//Edit User
const editUser=async(req,res)=>{
    try {
        const user=await User.findById(req.user)
        if(req.user === req.params.id || user.isAdmin){
            const response=await User.findByIdAndUpdate(req.params.id,req.body)
            if(!response){
                res.status(404).json({msg:"User not found!"})
            }else{ 
                res.status(200).json({msg:"user updated 🐥"})  
            }                   
        }else{
            res.status(401).json({msg:"Not authorize"})
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: error.message })
    }
}

module.exports={
    getAllUsers,
    getUser,
    deleteUser,
    editUser
}