const express=require('express');
const URL = require('../models/url');

const staticRouter=express.Router();

staticRouter.get("/",async(req,res)=>{
    const allUrls=await URL.find({});
    return res.render('home',{
        urls:allUrls
    })
})

module.exports=staticRouter;