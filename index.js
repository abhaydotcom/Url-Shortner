const express=require('express')
const {connectToMongo}=require('./connect')
const URL = require('./models/url');
const cookieParser=require("cookie-parser")
const urlRoute=require('./routes/url');
const path=require('path')
const staticRouter=require("./routes/StaticRouter")
const UserRoute=require("./routes/user");
const { restrictToLoggedIn,checkAuth } = require('./middlewares/auth');


const app=express();    
const PORT=9000;

connectToMongo('mongodb://localhost:27017/short-url')
.then(()=>console.log("Database connection Successful"))
.catch((e)=>console.log("Errot to conncet DB",e))


app.set("view engine","ejs")
app.set("views",path.resolve("./views"))


//MiddleWares
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

app.use('/url',restrictToLoggedIn,urlRoute);   
app.use("/",checkAuth,staticRouter)
app.use("/user",UserRoute)

 
  
app.get("/url/:shortId",async(req,res)=>{
    const shortId=req.params.shortId;
  const entry=  await URL.findOneAndUpdate({
        shortId,                
    },{$push:{visitHistory:{timestamp:Date.now()}}})

     res.redirect(entry.redirectUrl) 
})
app.listen(PORT,()=>console.log("Server Started..."))