const { getUser } = require("../service/auth");



function checkForAuthentication(req,res,next){
    const tokenCookies=req.cookies?.token;
    req.user=null;
    if(!tokenCookies )return next();
    const token=tokenCookies
    const user=getUser(token);

    req.user=user;
    return next()

}

function restrictTo(roles=[]){
    return function (req,res,next){
        if(!req.user)return res.redirect("/login")
        if(!roles.includes(req.user.role))return res.end("Unauthorized")

        return next();
    }
}

// async function  restrictToLoggedIn(req,res,next){
//     const userUuid=req.headers["authorization"]
//     if(!userUuid)return res.redirect("/login"); 
//     const token=userUuid.split("Bearer ")[1]
//     const user=getUser(token);
//     if(!user)return res.redirect("/login");
//         req.user=user;
//         next();
// }
 
// async function checkAuth(req,res,next){
//      console.log(req.headers)
//     const userUuid=req.headers["authorization"];
//     const token=userUuid.split("Bearer ")[1];
//     const user=getUser(token);
//     req.user=user;
//     next();
// } 

module.exports={   
   checkForAuthentication,
   restrictTo
} 