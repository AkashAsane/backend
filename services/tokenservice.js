const jwt=require('jsonwebtoken')

const generateToken=(userdata)=>{
   
   return jwt.sign(userdata,process.env.JWT_SECRETKEY)
}

module.exports=generateToken;