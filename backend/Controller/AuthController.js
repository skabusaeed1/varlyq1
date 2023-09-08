import UserModel from '../Model/userModel.js'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

export const allUser=async(req,res)=>{
    const users=await UserModel.find()
    res.status(200).json(users)
}

export const registerUser=async(req,res)=>{
    //    const {email,password,firstname,lastname} = req.body;
    
       const salt=await bcrypt.genSalt(10);
       const hashPass=await bcrypt.hash(req.body.password,salt)
       req.body.password=hashPass;
       const newUser=new UserModel(req.body)
        const {email} =req.body
    
       try {
        const oldUser=await UserModel.findOne({email})
        if(oldUser){
          return  res.status(400).json("email name is already registered!")
        }
        const user=await newUser.save()
        
        const token=jwt.sign({
            email:user.email,id:user._id
        },process.env.JWT_KEY,{expiresIn:"1h"})
    
        res.status(200).json({user,token});
       } catch (error) {
        res.status(500);
        console.log(error)
        console.log("error");
       }
    }

 export const deleteUser=async(req,res)=>{
    const id=req.params.id;

    const {currentUserId}=req.body;
    if(id===currentUserId){
        try {
            await UserModel.findByIdAndDelete(id);
            res.status(200).json("profile deleted successfully")
        } catch (error) {
            console.log(error);
        }
    }else{
        res.status(403).json("Access Denied! you can only delete your own profile");
     }
 } 
 
 export const updateUser=async(req, res)=>{
    const id = req.params.id;
    const { currentUserId, password } = req.body;

    if (id === currentUserId) {
        try {
            if (password) {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(password, salt);
              }
              const user = await UserModel.findByIdAndUpdate(id, req.body, {
                new: true,
              });
              const token = jwt.sign(
                { email: user.email, id: user._id },
                process.env.JWT_KEY,
                { expiresIn: "1h" }
              );
              console.log({user, token})
              res.status(200).json({user, token});
        } catch (error) {
            res.status(500).json(error);
        }
    }
    else {
        res.status(403).json("Access Denied! You can update only your own Account.");
      }
 }