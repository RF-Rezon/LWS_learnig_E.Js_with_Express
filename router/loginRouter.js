// External Import
const express = require("express");

// Enternal Import
const { getLogin, login, logout } = require("./../controller/loginController");
const decoratehtmlresponse = require("../middlewares/common/decoratehtmlresponse");
const {
  doLoginValidator,
  doLoginValidatorHandler,
} = require("../middlewares/login/loginValidatior");

const router = express.Router();

const page_title = "Login Page";

// Login Page

router.get("/", decoratehtmlresponse(page_title), getLogin);

router.post(
  "/",
  decoratehtmlresponse(page_title),
  doLoginValidator,
  doLoginValidatorHandler,
  login
);

router.delete("/", logout);

module.exports = router;
