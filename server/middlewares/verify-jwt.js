const jwt = require('jsonwebtoken')
const httpError = require('../Models/http-error')
const dotenv = require('dotenv');

dotenv.config();

module.exports = (req,res,next)=>{

    if(req.method === 'OPTIONS') return next()
    
    let token
    try{
        token = req.headers.authorization
       // console.log(token)
        if(!token){
            throw new Error('authentication failed in token verification')
        }
        const tokenInfo = jwt.verify(token,process.env.JWT_SECRETKEY)
        req.userData = {email:tokenInfo.email,id:tokenInfo.id}
        next();
    }
    catch(err){
        const error = new httpError('authentication failed in token verification',400)
        return next(error)
    }
}

