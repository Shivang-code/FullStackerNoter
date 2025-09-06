const express=require("express");
const {handleUserSignup,handleOtp,varifyUser} = require("../Controller/user")

const router=express.Router();

router.get("/",handleUserSignup)
router.post("/send-otp",handleOtp);
router.post("/verify-otp",varifyUser)


module.exports=router