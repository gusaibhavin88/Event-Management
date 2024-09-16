"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Event extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: "user_id" });
    }
  }
  Event.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      images: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      total_guest: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUID, // Fixed to match User model's ID type (INTEGER)
        allowNull: false,
        references: {
          model: "Users", // Ensure 'Users' table name matches actual table name
          key: "id",
        },
        onDelete: "CASCADE", // Ensures UserDetails get deleted if User is deleted
      },
    },
    {
      sequelize,
      modelName: "Event",
      timestamps: true,
    }
  );
  return Event;
};
