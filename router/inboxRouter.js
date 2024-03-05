// External Import
const express = require("express");

// Enternal Import
const { getInbox } = require("./../controller/inboxController");
const decoratehtmlresponse = require("../middlewares/common/decoratehtmlresponse");
const { checklogin } = require("./../middlewares/common/checklogin");

const router = express.Router();

// Inbox Page

router.get("/", decoratehtmlresponse("Inbox Page"), checklogin, getInbox);

module.exports = router;
