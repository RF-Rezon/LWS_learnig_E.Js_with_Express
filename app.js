const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");

const app = express();
dotenv.config();

// Database Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("Database Connnection successful."))
  .catch(console.error("Database Connnection failed."));

// Request Persers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use Cookieparser
app.use(cookieParser(process.env.COOKIE_SALT));

// Set View Engine
app.set("view engine", "ejs");

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Route Setup

// Error Handeling

app.get("/", (req, res) => {
  res.json("Req is comming");
});

// Porting
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
