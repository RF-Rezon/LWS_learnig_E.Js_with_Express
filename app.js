// external import
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const loginRouter = require("./router/loginRouter");
const usersRouter = require("./router/usersRouter");
const inboxRouter = require("./router/inboxRouter");

// internal import
const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/common/errorHandlers");

const app = express();
dotenv.config();

// Database Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("Database Connnection successful."))
  .catch((err) => console.error("Database Connection failed.", err));

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
app.use("/", loginRouter);
app.use("/users", usersRouter);
app.use("/inbox", inboxRouter);

// 404 Found Handler
app.use(notFoundHandler);

// Common Error Handler
app.use(errorHandler);

// app.get("/", (req, res) => {
//   res.json("Req is comming");
// });

// Porting
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
