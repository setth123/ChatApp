import { Router } from "express";
import queryModel from "../service/aiService";

const router=Router();

//bart-large 
router.post("/summarize",async(req,res)=>{
    const {text}=req.body;

    const result=await queryModel("facebook/bart-large-cnn",text);
    res.json(result);
});

//Helsinki-NLP
router.post("/translate",async(req,res)=>{
    const {text}=req.body;

    const result=await queryModel("Helsinki-NLP/opus-mt-en-de",text);
    res.json(result);
})

//distigpt2
router.post("/suggest",async(req,res)=>{
    const {text}=req.body;
    
    const result=await queryModel("distilgpt2",text);
    res.json(result);
})
export default router;