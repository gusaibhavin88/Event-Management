const catchAsyncError = require("../helpers/catchAsyncError");
const { returnMessage } = require("../utils/utils");
const statusCode = require("../messages/statusCodes.json");
const EventService = require("../services/eventService");
const { sendResponse } = require("../utils/sendResponse");
const eventService = new EventService();

//  Create Event
exports.createEvent = catchAsyncError(async (req, res, next) => {
  const event = await eventService.createEvent(
    req?.body,
    req?.files,
    req?.user
  );
  sendResponse(
    res,
    true,
    returnMessage("event", "created"),
    event,
    statusCode.success
  );
});

//  Update Event
exports.updateEvent = catchAsyncError(async (req, res, next) => {
  const event = await eventService.updateEvent(
    req?.body,
    req?.files,
    req?.user,
    req?.params?.eventId
  );
  sendResponse(
    res,
    true,
    returnMessage("event", "updated"),
    event,
    statusCode.success
  );
});

//  Get Event
exports.getEvent = catchAsyncError(async (req, res, next) => {
  const event = await eventService.getEvent(req?.user, req?.params);
  sendResponse(
    res,
    true,
    returnMessage("event", "eventFetched"),
    event,
    statusCode.success
  );
});

//  List Event
exports.listEvent = catchAsyncError(async (req, res, next) => {
  const list = await eventService.listEvent(req?.user, req?.query);
  sendResponse(
    res,
    true,
    returnMessage("event", "listFetched"),
    list,
    statusCode.success
  );
});

//  Delete Event
exports.deleteEvent = catchAsyncError(async (req, res, next) => {
  eventService.deleteEvent(req?.user, req?.params?.eventId);
  sendResponse(
    res,
    true,
    returnMessage("event", "deleted"),
    null,
    statusCode.success
  );
});
