// External Import
const express = require("express");

// Enternal Import
const {
  getallUsers,
  addUser,
  removeUser,
} = require("./../controller/usersController");
const decoratehtmlresponse = require("../middlewares/common/decoratehtmlresponse");
const avatarUploads = require("./../middlewares/users/avatarUploads");
const {
  addUsersValidatior,
  addUsersValidatiorHandler,
} = require("../middlewares/users/usersValidator");

const router = express.Router();

// Users Page
router.get("/", decoratehtmlresponse("Users Page"), getallUsers);

// Add user
router.post(
  "/",
  avatarUploads,
  addUsersValidatior,
  addUsersValidatiorHandler,
  addUser
);

// remove user
router.delete("/:id", removeUser);

module.exports = router;
