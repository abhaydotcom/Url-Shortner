const express=require('express')
const {connectToMongo}=require('./connect')
const urlRoute=require('./routes/url');
const URL = require('./models/url');
const path=require('path')
const staticRouter=require("./routes/StaticRouter")
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

app.use('/url',urlRoute);   
app.use("/",staticRouter)

 
  
app.get("/url/:shortId",async(req,res)=>{
    const shortId=req.params.shortId;
  const entry=  await URL.findOneAndUpdate({
        shortId,                
    },{$push:{visitHistory:{timestamp:Date.now()}}})

     res.redirect(entry.redirectUrl) 
})
app.listen(PORT,()=>console.log("Server Started..."))