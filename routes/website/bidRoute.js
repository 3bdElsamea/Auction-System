const express = require("express");
const { createBid } = require("../../controllers/website/bidController");

const router = express.Router();

router.post("/", createBid);

module.exports = router;
