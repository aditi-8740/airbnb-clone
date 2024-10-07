const jwt = require('jsonwebtoken');

function checkForAuthenticationCookie(req, res, next) {
    const token = req.cookies?.token;   
    req.user = null;

    if(!token){         //TOKEN not present in Cookie
        return next();
    }

    const userPayLoad = jwt.verify(token, process.env.PRIVATE_KEY, function(err, decoded) {     //VALIDATE Token
        try{
            return decoded
        }catch(err){
            console.log(err);
            next();
        }
    });
    req.user= userPayLoad;  //payload contains user info
    next();
}

module.exports =  {checkForAuthenticationCookie}