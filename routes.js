const express = require("express");

const globalErrorHandler = require("./controllers/errorController");
const trimMW = require("./middlewares/trimMW");
const dashboardRoute = require("./routes/dashboardRoute");
const websiteRoute = require("./routes/websiteRoute");
const { _500, _404 } = require("./middlewares/errorsMW");

const router = express.Router();

router.use(trimMW);
router.use("/admin", dashboardRoute);
router.use("/", websiteRoute);

// Error Handlers
router.use(_404); // Not Found Handlers
// router.use(_500); // Error Handler

// Error Handler
router.use(globalErrorHandler);

module.exports = router;
