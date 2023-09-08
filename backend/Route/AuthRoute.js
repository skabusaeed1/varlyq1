import express from 'express';
import {registerUser,allUser,deleteUser,updateUser} from '../Controller/AuthController.js'

const router= express.Router();

router.get("/register",allUser)
router.post("/register",registerUser)
router.delete("/register/:id",deleteUser)
router.put("/register/:id",updateUser)

export default router