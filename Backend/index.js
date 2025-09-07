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

app.use(express.json())
app.use(express.urlencoded({extended:false}))
const allowedOrigins = [
  "http://localhost:5173",                        // ✅ Local dev
  "https://full-stacker-noter.vercel.app",        // ✅ Your main Vercel frontend
  "https://full-stacker-noter-*.vercel.app"       // ✅ Any preview deployments
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like curl or Postman)
    if (!origin) return callback(null, true);

    if (
      allowedOrigins.includes(origin) ||
      origin.endsWith(".vercel.app") // allow any vercel subdomain
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS: " + origin));
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