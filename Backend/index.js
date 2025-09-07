const express = require("express");
const UserRoutes = require("./Routes/user");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Dynamic CORS setup
const corsOptions = {
  origin: function (origin, callback) {
    // Allow if no origin (like Postman), your main Vercel site, or any *.vercel.app subdomain
    if (
      !origin ||
      origin === "https://full-stacker-noter.vercel.app" ||
      origin.endsWith(".vercel.app")
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

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

console.log("Allowed frontend:", process.env.FRONTEND_URL);

// Routes
app.use("/user", UserRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server Connected on port ${PORT}`));
