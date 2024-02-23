// External Import
const express = require("express");

// Enternal Import
const { getUsers , addUser } = require("./../controller/usersController");
const decoratehtmlresponse = require("../middlewares/common/decoratehtmlresponse");
const avatarUploads = require("./../middlewares/users/avatarUploads");
const {
  addUsersValidatior,
  addUsersValidatiorHandler,
} = require("../middlewares/users/usersValidator");

const router = express.Router();

// Users Page
router.get("/", decoratehtmlresponse("Users Page"), getUsers);

// Add user
router.post("/", avatarUploads, addUsersValidatior, addUsersValidatiorHandler, addUser);

module.exports = router;
