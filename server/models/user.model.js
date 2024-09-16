"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.UserDetail, { foreignKey: "user_id" });
    }
  }
  User.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true, // Add email validation
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
      timestamps: true,
      // hooks: {
      //   beforeCreate: async (user) => {
      //     try {
      //       const bcrypt = require("bcrypt");
      //       const saltRounds = 10;
      //       const hash = await bcrypt.hash(user.password, saltRounds);
      //       user.password = hash;
      //     } catch (error) {
      //       throw new Error("Hashing password failed");
      //     }
      //   },
      // },
      // defaultScope: {
      //   attributes: { exclude: ["password"] }, // Default scope to exclude password
      // },
      // scopes: {
      //   withPassword: {
      //     attributes: {}, // Custom scope to include password if needed
      //   },
      // },
    }
  );
  return User;
};
