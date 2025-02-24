const express=require("express")
const router=express.Router();
const {HandleUserSingup,HandleUserLogin}=require("../controllers/user")


router.post('/',HandleUserSingup)
router.post('/login',HandleUserLogin)

module.exports=router;