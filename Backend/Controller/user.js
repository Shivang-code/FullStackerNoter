const otpStore=new Map();
const nodemailer=require("nodemailer")
const User=require("../Model/user")
const jwt = require("jsonwebtoken"); 
const JWT_SECRET = process.env.JWT_SECRET;


async function handleUserSignup(req,res)
{
    res.json({message:"User signup endpoint"}) 
}

async function handleOtp(req,res)
{

    const {name,email,dob,action}=req.body;
     const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore.set(email,otp);
const user=await User.findOne({email});
if (action==="signup" && user) {
  return res.status(400).json({ 
    success: false,
    message: "User already exists. Please go to Signin."
  });
}


  if (action === "signin" && !user) {
    return res.status(400).json({
      success: false,
      message: "User not found. Please Sign up first."
    });
  }
  if (action==="signup" && (!name || !dob ||!email)) {
    return res.status(400).json({
      success: false,
      message: "Name ,DOB and Email are required for signup."
    });
  }


    


    const transporter=nodemailer.createTransport({
        service:"gmail",
        auth:{user:"tyagishivang900@gmail.com" ,
            pass:"cquo scvd bele mnbs",
        }
    });
    try {
        await transporter.sendMail({
            from: "tyagishivang900@gmail.com",
            to: email,
            subject: "Login to shorti",
            text: `Your OTP is ${otp}`
        });
        res.json({ success: true, message: "OTP sent successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to send OTP" });
    }


}

async function  varifyUser(req,res){
    const {name,dob,email,otp,action}=req.body;
     const storedOtp =otpStore.get(email);
 if (!storedOtp) return res.status(400).json({ error: "No OTP found" });
 
  if (storedOtp.toString() !== otp.toString()) return res.status(400).json({ error: "Invalid OTP" });
  if(action==="signup"){
    await User.create({ name, dob, email });
  }
  const token=jwt.sign({email},process.env.JWT_SECRET,{expiresIn:"1h"})
  res.cookie("token",token)
  console.log(token);
  res.json({ message: "Login successful",token});
  otpStore.delete(email)

}

module.exports={
  handleUserSignup,
      handleOtp,
    varifyUser
}