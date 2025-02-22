const express=require('express');
const router=express.Router();
const { handleGenerateUrl,handleGetAnalytics } =require('../controllers/url')

router.post('/',handleGenerateUrl);

router.get('/analytics/:shortId',handleGetAnalytics)


module.exports=router;