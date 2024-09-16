const eventRoute = require("express").Router();
const eventController = require("../controllers/eventController");
const validatorFunc = require("../utils/validatorFunction.helper");
const { protect } = require("../middlewares/authUserMiddleware");
const { validateUserRegistration } = require("../validators/event.validator");
const { upload } = require("../helpers/multer");

eventRoute.use(protect);

eventRoute.post(
  "/add",
  upload.array("event_images"),
  validateUserRegistration,
  validatorFunc,
  eventController.createEvent
);
eventRoute.put(
  "/update/:eventId",
  upload.array("event_images"),
  eventController.updateEvent
);
eventRoute.delete("/:eventId", eventController.deleteEvent);
eventRoute.get("/list", eventController.listEvent);
eventRoute.get("/:eventId", eventController.getEvent);

module.exports = eventRoute;
