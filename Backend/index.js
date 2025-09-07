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
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"]
};
app.use(cors(corsOptions));

// app.use(cors(
//     { origin: process.env.FRONTEND_URL,   
//   credentials: true,}
// ));
app.use(cookieParser());
console.log("url",process.env.FRONTEND_URL);

app.use("/user",UserRoutes)
const PORT = process.env.PORT || 8000;

app.listen(PORT,()=>console.log("Server Connected"));