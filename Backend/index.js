const express= require("express")
const UserRoutes=require("./Routes/user")
const cors = require("cors");

const cookieParser = require("cookie-parser");
require('dotenv').config();
const mongoose = require("mongoose");
const app=express();



mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));
const allowedOrigins = [
  "https://full-stacker-noter.vercel.app", 
  "https://full-stacker-noter-2hn8zmmyg-shivangs-projects-151a3e0d.vercel.app"
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

app.use(cookieParser());
console.log("url",process.env.FRONTEND_URL);

app.use("/user",UserRoutes)
const PORT = process.env.PORT || 8000;

app.listen(PORT,()=>console.log("Server Connected"));