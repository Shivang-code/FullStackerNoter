import React from 'react'
import myImg from "../assets/Assignment.jpg"
import { useState } from 'react';
import { useNavigate } from "react-router-dom";


function Signin() {
   const navigate = useNavigate();
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

const sendOtp = async () => {
  const response=  await fetch(`${import.meta.env.VITE_API_URL}/user/send-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, action: "signin" })
    });

  const data = await response.json();
  
  if (!data.success) {
    
    alert(data.message); 
    navigate("/");

  } else {
     setStep("otp");
  }
       
  };

  const verifyOtp = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/user/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp ,action: "signin" }),
        credentials: "include", 
    });
    const data = await res.json();

    console.log(data);
    if(res.ok)
    {
      navigate("/dashboard");
    }
    else{
      alert(data.error)
    }
  };


  return (
    <section className='h-screen bg-white flex flex-row'>
      <div className='w-2/5  h-screen p-[32px] flex flex-col items-center justify-center bg-white px-4'>
      <div className="absolute top-6 left-6 flex items-center gap-2">
        {/* Replace with your logo */}
        <div className="w-6 h-6 rounded-full border-4 border-blue-500 "></div>
        <span className="font-semibold text-lg">HD</span>
      </div>

      {/* Form Container */}
      <div className="w-full max-w-md space-y-6">
        {/* Heading */}
        <div>
          <h1 className="text-3xl font-bold">Sign In</h1>
          <p className="text-gray-500">
            Sign In to enjoy the feature of HD
          </p>
        </div>

        {/* Form */}
        <form  
        className="space-y-4">
          {/* Email */}
          {step==="email"?
          (<div className='relative'>
            <label className=" absolute -top-2.5 left-2 z-10 inline-block bg-white px-1 font-medium  text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name='email'
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="jonas_kahnwald@gmail.com"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
            type='button'
            onClick={sendOtp}
            className="w-full bg-blue-500 text-white font-medium py-2 rounded-lg mt-6 hover:bg-blue-600 transition"
          >
            Get OTP
          </button>
          </div>):(
           <div className='relative'>
            <label className=" absolute -top-2.5 left-2 z-10 inline-block bg-white px-1 font-medium  text-sm text-gray-600 mb-1">OTP</label>
            <input
              value={otp}
              onChange={(e)=>setOtp(e.target.value)}
              placeholder="Enter Your OTP"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
              {/* Button */}
          <button
          type='button'
           onClick={verifyOtp}
            className="w-full bg-blue-500 text-white font-medium py-2 rounded-lg mt-6 hover:bg-blue-600 transition"
          >
            Verify
          </button>
          </div>)
}
        
        </form>
        

        {/* Footer */}
      </div>
      
      
      </div>
<div className='hidden md:flex w-3/5 h-screen p-[12px] gap-[10px]'>
  <img 
    src={myImg} 
    alt="" 
    className='w-full h-full object-cover rounded-[24px]' 
  />
</div>
    </section>
  )
}

export default Signin
