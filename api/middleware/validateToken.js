const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const Cookies = require('js-cookie');

const validateToken = asyncHandler(async(req,res,next)=>{
    jwt.verify(req.body.token,process.env.JWT_SECRET,(err,decode)=>{
        if(err){
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
        req.user = decode.user;
        next();
    });


    // let authHeader = req.headers.Authorization || req.headers.authorization;
    // console.log(authHeader);
    // if(authHeader && authHeader.startsWith("Bearer")){
    //     token = authHeader.split(" ")[1];
    //     jwt.verify(token,process.env.JWT_SECRET,(err,decode)=>{
    //         if(err){
    //             res.status(401);
    //             throw new Error("Not authorized, token failed");
    //         }
    //         req.user = decode.user;
    //         next();
    //     });
    //     if(!token){
    //         res.status(401);
    //         throw new Error("Not authorized, no token found");
    //     }
    // }
    // else{
    //     res.status(401);
    //     throw new Error("Not authorized, no bearer token found");
    // }
})
module.exports = validateToken;