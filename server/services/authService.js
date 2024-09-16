const jwt = require("jsonwebtoken");
const logger = require("../logger");
const { throwError } = require("../helpers/errorUtil");
const {
  returnMessage,
  validateEmail,
  passwordValidation,
  verifyUser,
} = require("../utils/utils");
const statusCode = require("../messages/statusCodes.json");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const sendEmail = require("../helpers/sendEmail");
const { User } = require("../models");

class UserService {
  tokenGenerator = async (payload) => {
    try {
      const expiresIn = payload?.remember_me
        ? process.env.JWT_REMEMBER_EXPIRE
        : process.env.JWT_EXPIRES_IN;
      const token = jwt.sign(
        { id: payload.id },
        process.env.JWT_User_SECRET_KEY,
        {
          expiresIn,
        }
      );
      return { token, user: payload };
    } catch (error) {
      logger.error(`Error while token generate, ${error}`);
      throwError(error?.message, error?.statusCode);
    }
  };

  // User Sign up
  signUp = async (payload, image) => {
    try {
      const { email, password, name } = payload;

      if (!validateEmail(email)) {
        return throwError(returnMessage("auth", "invalidEmail"));
      }

      if (!passwordValidation(password)) {
        return throwError(returnMessage("auth", "invalidPassword"));
      }

      const user = await User.findOne({ email: email });
      if (user) {
        return throwError(returnMessage("auth", "emailExist"));
      }

      const hashPassword = await bcrypt.hash(password, 14);

      let newUser = await User.create({
        email,
        password: hashPassword,
        name,
      });
      return newUser;
    } catch (error) {
      logger.error(`Error while user signup: ${error}`);
      return throwError(error?.message, error?.statusCode);
    }
  };

  // User Login
  login = async (payload) => {
    try {
      const { email, password } = payload;

      if (!validateEmail(email)) {
        return throwError(returnMessage("auth", "invalidEmail"));
      }

      if (!passwordValidation(password)) {
        return throwError(returnMessage("auth", "invalidPassword"));
      }
      console.log("jhjyh");

      const user = await User.findOne({ email: email });
      if (!user) {
        return throwError(returnMessage("auth", "invalidUser"));
      }

      const correctPassword = await bcrypt.compare(password, user?.password);

      if (!correctPassword) {
        return throwError(returnMessage("auth", "invalidUser"));
      }
      console.log("lllll");

      const userData = await this.tokenGenerator(user);
      return userData;
    } catch (error) {
      logger.error(`Error while  login : ${error}`);
      return throwError(error?.message, error?.statusCode);
    }
  };
}

module.exports = UserService;
