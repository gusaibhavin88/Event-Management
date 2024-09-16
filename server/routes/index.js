const router = require("express").Router();
const authRoute = require("./authRoute");
const eventRoute = require("./eventRoute");

router.use("/auth", authRoute);
router.use("/event", eventRoute);
module.exports = router;
