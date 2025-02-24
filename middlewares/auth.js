const { getUser } = require("../service/auth");

async function  restrictToLoggedIn(req,res,next){
    const userUuid=req.cookies?.uid;
    if(!userUuid)return res.redirect("/login"); 
    const user=getUser(userUuid);
    if(!user)return res.redirect("/login");
        req.user=user;
        next();
}
 
async function checkAuth(req,res,next){
    const userUuid=req.cookies?.uid;
    const user=getUser(userUuid);
    req.user=user;
    next();
}

module.exports={   
    restrictToLoggedIn,
    checkAuth
} 