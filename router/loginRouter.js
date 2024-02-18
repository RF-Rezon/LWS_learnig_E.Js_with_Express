// External Import
const express = require("express");

// Enternal Import
const { getLogin } = require("./../controller/loginController");
const decoratehtmlresponse = require("../middlewares/common/decoratehtmlresponse");

const router = express.Router();

// Login Page

router.get("/", decoratehtmlresponse("Login Page"), getLogin);

module.exports = router;
