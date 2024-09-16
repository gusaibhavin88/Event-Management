const jwt = require("jsonwebtoken");
const logger = require("../logger");
const { throwError } = require("../helpers/errorUtil");
const {
  returnMessage,
  validateEmail,
  passwordValidation,
  verifyUser,
  paginationObject,
} = require("../utils/utils");
const statusCode = require("../messages/statusCodes.json");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const sendEmail = require("../helpers/sendEmail");
const { User, sequelize, Event } = require("../models");
const fs = require("fs");
const { Op } = require("sequelize");

class EventService {
  // Create Event
  createEvent = async (payload, images, user) => {
    try {
      const { name, description, start_date, end_date, total_guest } = payload;
      // const transaction = await sequelize.transaction();

      const is_exist = await Event.findOne({
        where: {
          name: {
            [Op.iLike]: name,
          },
        },
      });

      if (is_exist) {
        return throwError(returnMessage("event", "alreadyExist"));
      }

      let attachments = [];
      images.forEach((item) => {
        attachments.push(`uploads/${item.filename}`);
      });

      const event = await Event.create(
        {
          name,
          description,
          start_date,
          end_date,
          total_guest,
          user_id: user?.id,
          images: attachments,
        }
        // { transaction }
      );
      // await transaction.commit();

      return event;
    } catch (error) {
      // await transaction.rollback();

      logger.error(`Error while create Event: ${error}`);
      return throwError(error?.message, error?.statusCode);
    }
  };

  // Update Event
  updateEvent = async (payload, images, user, event_id) => {
    try {
      const { name, description, start_date, end_date, total_guest, id } =
        payload;

      let attachments = [];
      images.forEach((item) => {
        attachments.push(`uploads/${item.filename}`);
      });

      const event = await Event.update(
        {
          name,
          description,
          start_date,
          end_date,
          total_guest,
          user_id: user?.id,
          images: attachments,
        },
        {
          returning: true,
          where: { id: event_id },
        }
      );

      return event[1];
    } catch (error) {
      logger.error(`Error while update Event: ${error}`);
      return throwError(error?.message, error?.statusCode);
    }
  };

  // List Event
  listEvent = async (user, query) => {
    try {
      const pagination = paginationObject(query);

      let queryObj = {
        [Op.or]: [
          {
            name: {
              [Op.iLike]: `%${query?.search}%`,
            },
          },
          {
            description: {
              [Op.iLike]: `%${query?.search}%`,
            },
          },
        ],
      };
      console.log(queryObj);

      const whereClause = {
        user_id: user?.id,
        ...queryObj,
      };
      const events = await Event.findAll({
        where: whereClause,
        limit: pagination.result_per_page,
        offset: pagination?.skip,
        order: pagination?.sort_by,
        raw: true,
      });
      return events;
    } catch (error) {
      logger.error(`Error while delete Event: ${error}`);
      return throwError(error?.message, error?.statusCode);
    }
  };

  // Get Event
  getEvent = async (user, payload) => {
    try {
      const { eventId } = payload;
      const event = await Event.findByPk(eventId);

      return event;
    } catch (error) {
      logger.error(`Error while delete Event: ${error}`);
      return throwError(error?.message, error?.statusCode);
    }
  };

  // Delete Event
  deleteEvent = async (user, event_id) => {
    try {
      const event = await Event.findOne({
        where: {
          user_id: user?.id,
          id: event_id,
        },
        raw: true,
      });

      if (!event) {
        return throwError(returnMessage("event", "notFound"));
      }

      if (event?.images?.length > 0) {
        event.images.forEach((item) => {
          console.log(`./src/${item}`);
          fs.unlink(`./${item}`, (err) => {
            if (err) {
              logger.error(`Error while unlinking the documents: ${err}`);
            }
          });
        });
      }

      await Event.destroy({
        where: {
          user_id: user?.id,
          id: event_id,
        },
      });
      return;
    } catch (error) {
      logger.error(`Error while delete Event: ${error}`);
      return throwError(error?.message, error?.statusCode);
    }
  };
}

module.exports = EventService;
