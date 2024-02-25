const bcrypt = require("bcrypt");
const User = require("../models/People");

async function getallUsers(req, res, next) {
  try {
    const users = await User.find();
    res.render("users", {
      users: users,
    });
  } catch (err) {
    next(err);
  }
}

const addUser = async (req, res, next) => {
  let newUser;
  const hasedPassword = await bcrypt.hash(req.body.password, 10);

  if (req.files && req.files.length > 0) {
    newUser = new User({
      ...req.body,
      avatar: req.files[0].filename,
      password: hasedPassword,
    });
  } else {
    newUser = new User({
      ...req.body,
      password: hasedPassword,
    });
  }

  try {
    await newUser.save();
    res.status(200).json({
      message: "User was added successfully!",
    });
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: "Unknown error occured!",
        },
      },
    });
  }
};

module.exports = { getallUsers, addUser };
