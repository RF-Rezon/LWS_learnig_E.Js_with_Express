const { check, validationResult } = require("express-validator");
const createError = require("http-errors");
const { unlink } = require("fs");
const { path } = require("path");

const User = require("../../models/People");

const addUsersValidatior = [
  check("name")
    .isLength({ min: 1 })
    .withMessage("Name is Required")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name must not contain anything other than alphabet")
    .trim(),
  check("email")
    .isEmail()
    .withMessage("Invalid email address")
    .trim()
    .custom(async (value) => {
      try {
        const user = await User.findOne({ email: value });
        if (user) {
          throw createError("Email already axists!");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),
  check("mobile")
    .isMobilePhone("bn-BD", {
      strictMode: true,
    })
    .withMessage("Mobile number must be a Bangladeshi Number")
    .custom(async (value) => {
      try {
        const user = await User.findOne({ mobile: value });
        if (user) {
          throw createError("Mobile number already axists!");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),
  check("password")
    .isStrongPassword()
    .withMessage(
      "Password should be at least 8 chaercters long and should contain at least 1 lowecase, 1 uppercase, 1 number & 1 symbol."
    ),
];

const addUsersValidatiorHandler = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();

  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    // first delete the uploaded file (junk file)

    if (req.files.length > 0) {
      const { filename } = req.files[0];
      unlink(
        path.join(__dirname, `/../public/uploads/avatars/${filename}`),
        (err) => {
          if (err) console.error(err);
        }
      );
    }

    res.status(500).json({
      errors: mappedErrors,
    });
  }
};

module.exports = { addUsersValidatior, addUsersValidatiorHandler };
