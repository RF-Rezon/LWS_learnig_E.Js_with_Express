const User = require("../models/People");
const bcrypt = require("bcrypt");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");

function getLogin(req, res, next) {
  res.render("index");
}

async function login(req, res, next) {
  try {
    const user = await User.findOne({
      $or: [{ email: req.body.username }, { number: req.body.username }],
    });

    if (user && user._id) {
      const isValidUser = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (isValidUser) {
        const userObject = {
          username: user.name,
          mobile: user.mobile,
          email: user.email,
          role: "user",
        };

        const token = jwt.sign(userObject, process.env.JWT_SECRETKEY, {
          expiresIn: process.env.JWT_EXPIRESIN,
        });

        res.cookie(process.env.COOKIE_NAME, token, {
          maxAge: process.env.JWT_EXPIRESIN,
          httpOnly: true,
          signed: true,
        });

        res.locals.loggedInUser = userObject;

        res.render("inbox");
      } else {
        throw createError("Login Failed! Please try again!");
      }
    } else {
      throw createError("Login Failed! Please try again!");
    }
  } catch (err) {
    res.render("index", {
      // data: {
      //   username: req.body.username,
      // },
      errors: {
        common: {
          msg: err.message,
        },
      },
    });
  }
}

// logout
function logout(req, res) {
  res.clearCookie(process.env.COOKIE_NAME);
  res.send("logged out");
}

module.exports = { getLogin, login, logout };
