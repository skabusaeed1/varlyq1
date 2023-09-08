import PostModal from '../Model/postModel.js'
import UserModel from '../Model/userModel.js';
import mongoose from 'mongoose'

export const createPost = async (req, res) => {
    const newPost = new PostModal(req.body);
    try {
      await newPost.save();
      res.status(200).json(newPost);
    } catch (error) {
      res.status(500).json(error);
    }
  };

  export const getPost=async(req,res)=>{
    const {createdBy}=req.body;
    try {
        const post=await PostModal.find({createdBy});
        res.status(200).json(post);
    } catch (error) {
        console.log(error)
    }
} 

export const updatePost=async(req,res)=>{
   const id=req.params.id;
   const {createdBy,message}=req.body;
   try {
     const post=await PostModal.findByIdAndUpdate(id,{createdBy,message},{new:true});
     res.status(200).json(post);
   } catch (error) {
    res.status(403).json("Something went wrong");
   }
}

export const deletePost=async(req,res)=>{
    const id=req.params.id;
    try {
        await PostModal.findByIdAndDelete(id);
        res.status(200).json("Post deleted successfully")
    } catch (error) {
      res.status(403).json("Access Denied! you can only delete your own Post");
    }
}