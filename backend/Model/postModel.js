import mongoose from "mongoose";

const postSchema=mongoose.Schema({
    createdBy:{type:String,required:true},
    createdAt:{ type: Date,default: Date.now},
    updatedAt:{type: Date,default: Date.now},
    message:{type:String,required:true},
    comments:[],
    liked:[],
})

const PostModal=mongoose.model("posts",postSchema);

export default PostModal;