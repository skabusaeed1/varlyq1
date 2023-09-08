import express from 'express'
const router =express.Router();
import {createPost,getPost,deletePost,updatePost} from '../Controller/PostController.js';
import authMiddleWare from '../middleware/AuthMiddleware.js';

router.post("/",createPost)
router.get("/",authMiddleWare,getPost)
router.delete("/:id",authMiddleWare,deletePost)
router.put("/:id",authMiddleWare,updatePost)

export default router