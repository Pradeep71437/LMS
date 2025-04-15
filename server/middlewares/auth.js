const jwt=require("jsonwebtoken")
const userschema=require("../models/userschema")

async function homeauth(req,res,next){
    const{token,role}=req.body
    let tokens;
    console.log(token)
    if(token){
        try{
            tokens=token
            const decoded=jwt.verify(token, "process.env.SECRET-KEY")
            const emailverified= await userschema.findById({_id:decoded.id}).select("-password")
            req.user=emailverified
            next()
        }catch(e){
        console.log(e)
        }
    }else{
        console.log("else")
        res.send(400).send("please re-login your account")
    }

}

module.exports=homeauth