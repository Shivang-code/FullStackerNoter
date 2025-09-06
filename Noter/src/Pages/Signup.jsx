import React, { useState } from "react";
import myImg from "../assets/Assignment.jpg";
import { useNavigate, Link } from "react-router-dom";
import Button from "../Component/Button";

function Signup() {
  const navigate = useNavigate();
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [dob,setdob]=useState("");
  const [name,setName]=useState("");

  const sendOtp = async (e) => {
    e.preventDefault(); // prevent form reload
   const response =  await fetch(`${import.meta.env.VITE_API_URL}/user/send-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        email,name,dob ,
          action: "signup" 
      
      }),
    });

     const data = await response.json();
  
  if (!data.success) {
    
    alert(data.message); 
  } else {
     setStep("otp");
  }

  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    const res = await fetch(`${import.meta.env.VITE_API_URL}/user/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp ,name,dob, action: "signup" }),
      credentials: "include",
    });
    const data = await res.json();
    console.log(data);
    if (res.ok) {
      navigate("/dashboard");
    } else {
      alert(data.error);
    }
  };

  return (
    <section className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Left Section (Form) */}
      <div className="w-full md:w-2/5 flex flex-col items-center justify-center px-6 py-8 md:px-12 relative">
        {/* Logo */}
        <div className="absolute top-6 left-6 flex items-center gap-2">
          <div className="w-6 h-6 rounded-full border-4 border-blue-500"></div>
          <span className="font-semibold text-lg">HD</span>
        </div>

        {/* Form Container */}
        <div className="w-full max-w-md space-y-6">
          {/* Heading */}
          <div>
            <h1 className="text-3xl font-bold">Sign up</h1>
            <p className="text-gray-500 text-sm md:text-base">
              Sign up to enjoy the feature of HD
            </p>
          </div>

          {/* Form */}
          <form className="space-y-4">
            {/* Name */}
            <div className="relative">
              <label className=" absolute -top-2.5 left-2 z-10 inline-block bg-white px-1 font-medium  text-sm text-gray-600 mb-1">
                Your Name
              </label>
              <input
              value={name}
              onChange={(e)=>setName(e.target.value)}
              name="name"
                type="text"
                placeholder="Jonas Khanwald"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* DOB */}
            <div className="relative">
              <label className=" absolute -top-2.5 left-2 z-10 inline-block bg-white px-1 font-medium  text-sm text-gray-600 mb-1">
                Date of Birth
              </label>
              <input
              value={dob}
              onChange={(e)=>setdob(e.target.value)}
              id="dob"
                type="date"
                name="dob"
                placeholder="11 December 1997"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email or OTP */}
            {step === "email" ? (
              <div className="relative group">
                <label className="
                absolute -top-2.5 left-2 z-10 inline-block bg-white px-1 font-medium 
                 text-sm text-gray-600 mb-1">
                  Email
                </label>
                
                <input
                  type="email"
                  autoComplete="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jonas_kahnwald@gmail.com"
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                type="button"
                  onClick={sendOtp}
                  className="w-full bg-blue-500 text-white font-medium py-2 rounded-lg mt-6 hover:bg-blue-600 transition"
                >
                  Get OTP
                </button>
              </div>
            ) : (
              <div className="relative">
                <label className=" absolute -top-2.5 left-2 z-10 inline-block bg-white px-1 font-medium  text-sm text-gray-600 mb-1">OTP</label>
                <input
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter Your OTP"
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                type="button"
                  onClick={verifyOtp}
                  className="w-full bg-blue-500 text-white font-medium py-2 rounded-lg mt-6 hover:bg-blue-600 transition"
                >
                  Verify
                </button>
              </div>
            )}
          </form>
          <div className="my-6 flex items-center"><div className="flex-grow border-t border-gray-300"></div><span className="mx-4 text-sm text-gray-500">OR</span><div className="flex-grow border-t border-gray-300"></div></div>
          <Button/>


          {/* Footer */}
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/signin" className="text-blue-500 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
        

      </div>

      {/* Right Section (Image) */}
      <div className="hidden md:flex w-full md:w-3/5 p-4">
        <img
          src={myImg}
          alt="Signup Visual"
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
      
    </section>
  );
}

export default Signup;
