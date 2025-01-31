const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define(
  'User',
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

User.sync();

module.exports = User;
