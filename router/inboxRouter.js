// External Import
const express = require("express");

// Enternal Import
const { getInbox } = require("./../controller/inboxController");
const decoratehtmlresponse = require("../middlewares/common/decoratehtmlresponse");

const router = express.Router();

// Inbox Page

router.get("/", decoratehtmlresponse("Inbox Page"), getInbox);

module.exports = router;
