import { Router } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";
import jwt from "jsonwebtoken";
const router=Router();
router.post("/register",async(req,res)=>{
    const{username,password}=req.body;
    try{
        const hashed=await bcrypt.hash(password,10);
        const user=new User({username,password:hashed});
        await user.save();
        res.status(201).json({message:"User created"});
    }
    catch(err){
        res.status(500).json({error:"Server error"});
    }
});

router.post("/login",async(req,res)=>{
    const {username,password}=req.body;
    try{
        const user=await User.findOne({username});
        if(!user)return res.status(404).json({error:"User not found"});
        const valid=await bcrypt.compare(password,user.password);
        if(!valid)return res.status(401).json({error:"Invalid credentials"});
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET||"secret",{expiresIn:"1d"});
        res.status(200).json({token});
    }
    catch(err){
        res.status(500).json({error:"Server error"});
    }
})
export default router;