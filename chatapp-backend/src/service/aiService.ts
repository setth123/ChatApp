import axios from 'axios';

const HF_API_URL = "https://api-inference.huggingface.co/models";
const HF_API_KEY = process.env.HF_API_KEY || "";

export default async function queryModel(model:string,inputs:any){
    try{
        const res=await axios.post(
            `${HF_API_URL}/${model}`,
            {inputs},
            {
                headers:{
                    Authorization: `Bearer ${HF_API_KEY}`,
                }
            }
        );
        return res.data;
    }
    catch(err){
        console.log("HF API Error: ",err);
        return {error: "API Request Failed"};
    }
}