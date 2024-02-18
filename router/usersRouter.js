// External Import
const express = require("express");

// Enternal Import
const { getUsers } = require("./../controller/usersController");
const decoratehtmlresponse = require("../middlewares/common/decoratehtmlresponse");

const router = express.Router();

// Users Page

router.get("/", decoratehtmlresponse("Users Page"), getUsers);

module.exports = router;
