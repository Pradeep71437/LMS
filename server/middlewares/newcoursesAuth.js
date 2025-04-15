const jwt=require("jsonwebtoken")
const userschema=require("../models/userschema")

async function newcorsesAuth(req,res,next){
    const{token}=req.body
    // console.log(token)
    if(!token){
           res.status(401).send("please login useraccount")
           console.log("first error")
    }else{
   
    const valies=token
    const tokenvalue=valies.token
    const decoded=jwt.verify(tokenvalue, "process.env.SECRET-KEY")
    if(!decoded){
        console.log("second eroor")
        res.status(401).send("please login useraccount")
    }else{
        // const restoken= await userschema.findById(decoded.id)
        // console.log(decoded)
        req.user=decoded
       
        next()
    }
    }
  
}
module.exports=newcorsesAuth