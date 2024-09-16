const { body } = require("express-validator");
const validationMessage = require("../messages/validation.json");

exports.validateUserRegistration = [
  body("name").notEmpty().withMessage(validationMessage.events.nameRequired),
  body("description")
    .notEmpty()
    .withMessage(validationMessage.events.descriptionRequired),
  body("start_date")
    .notEmpty()
    .withMessage(validationMessage.events.start_date),
  body("end_date").notEmpty().withMessage(validationMessage.events.end_date),
];
